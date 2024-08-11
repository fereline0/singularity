import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const currentUserId = searchParams.get("userId");

    if (!currentUserId) {
      return NextResponse.json("userId is a required search parameter", {
        status: 500,
      });
    }

    const userComment = await prisma.$transaction([
      prisma.userComment.findUniqueOrThrow({
        where: {
          id: params.id,
        },
        select: {
          likers: {
            where: {
              id: currentUserId,
            },
          },
        },
      }),
      prisma.userComment.findUniqueOrThrow({
        where: {
          id: params.id,
        },
        select: {
          likers: {
            take: 3,
          },
          _count: {
            select: {
              likers: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json(userComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.formData();

  try {
    const userComment = await prisma.userComment.update({
      where: {
        id: params.id,
      },
      data: {
        likers: {
          connect: {
            id: body.get("userId") as string,
          },
        },
      },
    });

    return NextResponse.json(userComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.formData();

  try {
    const userComment = await prisma.userComment.update({
      where: {
        id: params.id,
      },
      data: {
        likers: {
          disconnect: {
            id: body.get("userId") as string,
          },
        },
      },
    });

    return NextResponse.json(userComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
