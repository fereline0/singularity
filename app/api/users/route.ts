import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit"));
  const pageToSkip = (Number(searchParams.get("page")) - 1) * limit;
  const query = searchParams.get("q")?.toString();

  try {
    const users = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            },
          ],
        },
        take: limit,
        skip: pageToSkip,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          role: true,
        },
      }),
      prisma.user.findMany({
        take: 10,
      }),
      prisma.user.count({
        where: {
          AND: [
            {
              OR: [
                {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            },
          ],
        },
      }),
    ]);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
