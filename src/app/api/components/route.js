// app/api/components/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // ← your NextAuth v5 helper
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  // 1. Check session
  const session = await auth(); // ← reads cookies from `request` internally
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Pull payload
  const { name, html, css, js } = await request.json();

  // 3. Create component tied to the authenticated user
  const component = await prisma.component.create({
    data: {
      name: name || "New Component",
      html: html || "",
      css: css || "",
      js: js || "",
      user: { connect: { id: session.user.id } },
    },
  });

  // 4. Return the new record
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
    where: { userId: session.user.id },
    orderBy: { id: "desc" }, // newest first
  });

  return NextResponse.json(components, { status: 200 });
}
