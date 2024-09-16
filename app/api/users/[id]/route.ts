import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        detailInformation: true,
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
        role: true,
        bans: {
          include: {
            initiator: {
              include: {
                role: true,
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

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
