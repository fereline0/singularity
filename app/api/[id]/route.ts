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
    const sections = await prisma.section.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        childs: true,
        articles: {
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
          },
        },
        _count: {
          select: {
            articles: true,
          },
        },
      },
    });
    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
