import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;
  const query = req.nextUrl.searchParams.get("q")?.toString();

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        subscribed: {
          where: {
            user: {
              name: {
                search: query,
              },
            },
          },
          skip: pageToSkip,
          take: limit,
          orderBy: {
            user: {
              subscribed: {
                _count: "desc",
              },
            },
          },
          select: {
            user: {
              include: {
                role: true,
                _count: {
                  select: {
                    writerComments: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            subscribed: {
              where: {
                user: {
                  name: {
                    search: query,
                  },
                },
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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.formData();

    const userSubscriber = await prisma.userSubscribers.create({
      data: {
        userId: params.id,
        subscriberId: body.get("subscriberId") as string,
      },
    });

    return NextResponse.json(userSubscriber, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.formData();
    const unSubscribe = await prisma.userSubscribers.delete({
      where: {
        subscriberId_userId: {
          subscriberId: body.get("subscriberId") as string,
          userId: params.id,
        },
      },
    });
    return NextResponse.json(unSubscribe, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
