import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const likerId = searchParams.get("likerId");

    const article = await prisma.$transaction([
      prisma.articleLiker.findUnique({
        where: {
          likerId_articleId: {
            likerId: likerId ?? "",
            articleId: params.id,
          },
        },
      }),
      prisma.articleLiker.count({
        where: {
          articleId: params.id,
        },
      }),
    ]);

    return NextResponse.json(article, { status: 200 });
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
    const article = await prisma.articleLiker.create({
      data: {
        articleId: params.id,
        likerId: body.get("likerId") as string,
      },
    });

    return NextResponse.json(article, { status: 200 });
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
    const article = await prisma.articleLiker.delete({
      where: {
        likerId_articleId: {
          likerId: body.get("likerId") as string,
          articleId: params.id,
        },
      },
    });

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
