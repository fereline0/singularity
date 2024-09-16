import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;
  const query = searchParams.get("query")?.toString();
  const order = searchParams.get("order")?.toString();

  try {
    const section = await prisma.section.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        childs: true,
        supervisors: {
          include: {
            role: true,
          },
        },
        articles: {
          take: limit,
          skip: pageToSkip,
          where: {
            published: true,
            AND: [
              {
                OR: [
                  {
                    title: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                  {
                    value: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                  {
                    writer: {
                      name: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                  },
                ],
              },
            ],
          },
          orderBy: {
            createdAt: order == "asc" ? "asc" : "desc",
          },
          include: {
            comments: {
              where: {
                published: true,
              },
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
              select: {
                createdAt: true,
                writer: true,
              },
            },
            writer: true,
          },
        },
        _count: {
          select: {
            articles: {
              where: {
                published: true,
                AND: [
                  {
                    OR: [
                      {
                        title: {
                          contains: query,
                          mode: "insensitive",
                        },
                      },
                      {
                        value: {
                          contains: query,
                          mode: "insensitive",
                        },
                      },
                      {
                        writer: {
                          name: {
                            contains: query,
                            mode: "insensitive",
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    });

    return NextResponse.json(section, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
