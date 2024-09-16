import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  try {
    const articleCommentCount = await prisma.articleComment.count({
      where: {
        published: true,
      },
    });

    return NextResponse.json(articleCommentCount, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
