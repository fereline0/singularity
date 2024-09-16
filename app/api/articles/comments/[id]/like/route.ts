import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const likerId = searchParams.get("likerId");

    const articleCommentLiker = await prisma.$transaction([
      prisma.articleCommentLiker.findUnique({
        where: {
          likerId_articleCommentId: {
            likerId: likerId ?? "",
            articleCommentId: params.id,
          },
        },
      }),
      prisma.articleCommentLiker.count({
        where: {
          articleCommentId: params.id,
        },
      }),
    ]);

    return NextResponse.json(articleCommentLiker, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.formData();

  try {
    const articleCommentLiker = await prisma.articleCommentLiker.create({
      data: {
        articleCommentId: params.id,
        likerId: body.get("likerId") as string,
      },
    });

    return NextResponse.json(articleCommentLiker, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.formData();

  try {
    const articleCommentLiker = await prisma.articleCommentLiker.delete({
      where: {
        likerId_articleCommentId: {
          likerId: body.get("likerId") as string,
          articleCommentId: params.id,
        },
      },
    });

    return NextResponse.json(articleCommentLiker, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
