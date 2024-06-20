import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const parentId = body.get("parentId");
    const data: any = {
      value: body.get("comment") as string,
      userId: body.get("userId") as string,
      writerId: body.get("writerId") as string,
    };

    if (parentId !== null) {
      data.parentId = parentId as string;
    }

    const userComment = await prisma.userComments.create({
      data: data,
    });

    return NextResponse.json(userComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
