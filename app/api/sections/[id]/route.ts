import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const section = await prisma.section.findUniqueOrThrow({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(section, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
