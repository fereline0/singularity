import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  try {
    const sections = await prisma.section.findMany({
      where: {
        parentId: null,
      },
    });

    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
