import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;

  try {
    const articles = await prisma.$transaction([
      prisma.article.findMany({
        take: limit,
        skip: pageToSkip,
        where: {
          published: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          writer: true,
          section: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            select: {
              createdAt: true,
              writer: true,
            },
          },
        },
      }),
      prisma.article.count({
        where: {
          published: true,
        },
      }),
    ]);
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
