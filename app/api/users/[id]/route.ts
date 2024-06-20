import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        detailInformation: true,
        subscribers: {
          orderBy: {
            subscriber: {
              subscribers: {
                _count: "desc",
              },
            },
          },
          take: 5,
          select: {
            subscriber: {
              include: {
                role: true,
              },
            },
          },
        },
        subscribed: {
          take: 5,
          select: {
            user: {
              include: {
                role: true,
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
            subscribers: true,
            subscribed: true,
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
  { params }: { params: { id: string } }
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
