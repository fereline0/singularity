import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit"));
    const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;

    const articleComment = await prisma.articleComment.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        childs: {
          orderBy: {
            createdAt: "desc",
          },
          skip: pageToSkip,
          take: limit,
          include: {
            writer: {
              include: {
                role: true,
              },
            },
            _count: {
              select: {
                childs: true,
              },
            },
          },
        },
        _count: {
          select: {
            childs: true,
          },
        },
      },
    });

    return NextResponse.json(articleComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.formData();

    const articleComment = await prisma.articleComment.update({
      where: {
        id: params.id,
      },
      data: {
        value: body.get("value") as string,
      },
    });

    return NextResponse.json(articleComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const articleComment = await prisma.articleComment.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(articleComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
