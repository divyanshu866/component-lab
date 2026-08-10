// app/api/components/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // ← your NextAuth v5 helper
import { prisma } from "@/lib/prisma";
import { PromptRole, TargetTech } from "@prisma/client";
export async function POST(request) {
  // 1. Check session

  const session = await auth(); // ← reads cookies from `request` internally
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Pull payload
  const {
    messages = [],
    name,
    html,
    css,
    js,
    jsx,
    targetTech,
  } = await request.json();

  console.log("This is the Prompt from the frontend>>>>>: ", messages);
  // 3. Create component tied to the authenticated user
  const component = await prisma.$transaction(async (tx) => {
    if (messages.length < 2) {
      const component = await tx.component.create({
        data: {
          name: name.trim() || "New Component",
          html: html.trim() || "",
          css: css.trim() || "",
          js: js.trim() || "",
          jsx: jsx.trim() || "",
          targetTech:
            targetTech === "HTML" ? TargetTech.HTML : TargetTech.REACT,
          user: { connect: { id: session.user.id } },
        },
        include: {
          prompts: {
            orderBy: {
              id: "asc",
            },
          },
        },
      });

      return component;
    }

    const component = await tx.component.create({
      data: {
        name: name.trim() || "New Component",
        html: html.trim() || "",
        css: css.trim() || "",
        js: js.trim() || "",
        jsx: jsx.trim() || "",
        targetTech: targetTech === "HTML" ? TargetTech.HTML : TargetTech.REACT,
        user: { connect: { id: session.user.id } },
        prompts: {
          create: [
            {
              message: messages[messages.length - 2]?.message,
              role: PromptRole.USER,
            },
            {
              message: messages[messages.length - 1]?.message,
              role: PromptRole.ASSISTANT,
            },
          ],
        },
      },
      include: {
        prompts: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    return component;
  });

  return NextResponse.json(component, { status: 201 });
}

// app/api/components/route.ts
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch components for the logged-in user
  const components = await prisma.component.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      prompts: {
        orderBy: {
          id: "asc",
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(components, { status: 200 });
}
