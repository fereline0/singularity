import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;

  try {
    const articles = await prisma.article.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        writer: true,
        section: true,
        comments: {
          take: limit,
          skip: pageToSkip,
          where: {
            parent: null,
            published: true,
          },
          orderBy: {
            createdAt: "desc",
          },
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
            comments: {
              where: {
                parent: null,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
