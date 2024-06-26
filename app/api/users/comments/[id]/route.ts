import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit"));
    const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;
    const userComment = await prisma.userComments.findUniqueOrThrow({
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
          },
        },
        _count: {
          select: {
            childs: true,
          },
        },
      },
    });

    return NextResponse.json(userComment, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const comment = await prisma.userComments.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
