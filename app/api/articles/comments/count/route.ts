import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  try {
    const articleCommentsCount = await prisma.articleComments.count({
      where: {
        published: true,
      },
    });

    return NextResponse.json(articleCommentsCount, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
