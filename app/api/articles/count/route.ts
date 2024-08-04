import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  try {
    const articlesCount = await prisma.article.count({
      where: {
        published: true,
      },
    });

    return NextResponse.json(articlesCount, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
