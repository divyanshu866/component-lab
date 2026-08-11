// app/api/components/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { TargetTech } from "@prisma/client";
export async function DELETE(req, context) {
  const { id } = await context.params; // <-- await params
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure user owns the component
  const component = await prisma.component.findUnique({
    where: { id: Number(id) },
  });

  if (!component || component.userId !== session.user.id) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  // Delete the component
  try {
    await prisma.component.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, context) {
  const { id } = await context.params;
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    messages = [],
    name,
    html,
    css,
    js,
    jsx,
    targetTech,
    usageMetadata,
    model,
  } = await req.json();
  console.log(
    "SAVE PATCH REACT COMP====>> TARGET TECH",
    // name,
    messages,
    // html,
    // css,
    // js,
    // jsx,
    targetTech,
  );
  const component = await prisma.component.findUnique({
    where: { id: Number(id) },
  });

  if (!component || component.userId !== session.user.id) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const updated = await prisma.$transaction(async (tx) => {
    await tx.component.update({
      where: { id: Number(id) },
      data: {
        name,
        html,
        css,
        js,
        jsx,
        targetTech: targetTech === "HTML" ? TargetTech.HTML : TargetTech.REACT,
      },
    });
    if (messages.length >= 2) {
      await tx.prompt.create({
        data: {
          componentId: Number(id),
          role: messages[0]?.role,
          message: messages[0]?.message,
          aiRequest: usageMetadata
            ? {
                create: {
                  model,
                  targetTech:
                    targetTech === "HTML" ? TargetTech.HTML : TargetTech.REACT,
                  inputTokens: usageMetadata.promptTokenCount ?? 0,
                  outputTokens: usageMetadata.candidatesTokenCount ?? 0,
                  thinkingTokens: usageMetadata?.thoughtsTokenCount ?? 0,
                  totalTokens: usageMetadata?.totalTokenCount ?? 0,
                },
              }
            : undefined,
        },
      });
      await tx.prompt.create({
        data: {
          componentId: Number(id),
          role: messages[1]?.role,
          message: messages[1]?.message,
        },
      });
    }

    return await tx.component.findUnique({
      where: { id: Number(id) },
      include: {
        prompts: {
          orderBy: {
            id: "asc",
          },
          include: {
            aiRequest: true,
          },
        },
      },
    });
  });

  return NextResponse.json(updated, { status: 200 });
}
