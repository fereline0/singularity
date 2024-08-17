import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const likerId = searchParams.get("likerId");

    const userComment = await prisma.$transaction([
      prisma.userCommentLiker.findUnique({
        where: {
          likerId_userCommentId: {
            likerId: likerId ?? "",
            userCommentId: params.id,
          },
        },
      }),
      prisma.userCommentLiker.count({
        where: {
          userCommentId: params.id,
        },
      }),
    ]);

    return NextResponse.json(userComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.formData();

  const data = {
    userCommentId: params.id,
    likerId: body.get("likerId") as string,
  };

  try {
    const userComment = await prisma.userCommentLiker.create({
      data: data,
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
    const userComment = await prisma.userCommentLiker.delete({
      where: {
        likerId_userCommentId: {
          likerId: body.get("likerId") as string,
          userCommentId: params.id,
        },
      },
    });

    return NextResponse.json(userComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
