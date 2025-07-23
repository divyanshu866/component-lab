// app/api/components/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { html, css, js, name } = await req.json();

  // Ensure user owns the component
  const component = await prisma.component.findUnique({
    where: { id: Number(params.id) },
  });

  if (!component || component.userId !== session.user.id) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  // Update the component
  const updated = await prisma.component.update({
    where: { id: Number(params.id) },
    data: { html, css, js, name },
  });

  return NextResponse.json(updated, { status: 200 });
}
