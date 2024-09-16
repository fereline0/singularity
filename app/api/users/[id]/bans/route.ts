import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.formData();

    const user = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        bans: {
          create: {
            initiatorId: body.get("initiatorId") as string,
            reason: body.get("reason") as string,
            expires: new Date(body.get("expires") as string),
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
    const bans = await prisma.userBans.updateMany({
      where: {
        userId: params.id,
      },
      data: {
        activity: false,
      },
    });

    return NextResponse.json(bans, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
