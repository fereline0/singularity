import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const parentId = body.get("parentId");

    const data = {
      value: body.get("value") as string,
      userId: body.get("userId") as string,
      writerId: body.get("writerId") as string,
      parentId: parentId !== null ? (parentId as string) : undefined,
    };

    const userComment = await prisma.userComment.create({
      data: data,
    });

    return NextResponse.json(userComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
