import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const roles = await prisma.userRole.findMany({
      where: {
        id: {
          lt: params.id,
        },
      },
    });

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
