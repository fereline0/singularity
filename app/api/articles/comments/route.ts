import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const parentId = body.get("parentId");

    const articleComment = await prisma.articleComment.create({
      data: {
        value: body.get("value") as string,
        articleId: body.get("articleId") as string,
        writerId: body.get("writerId") as string,
        published: body.get("published") == "true",
        parentId: parentId !== null ? (parentId as string) : undefined,
      },
    });

    return NextResponse.json(articleComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
