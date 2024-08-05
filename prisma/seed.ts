import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.roleAbility.createMany({
    data: [
      { slug: "deleteUser" },
      { slug: "deleteUserComment" },
      { slug: "superviseForum" },
      { slug: "editUser" },
      { slug: "editUserRole" },
      { slug: "banUser" },
    ],
    skipDuplicates: true,
  });

  await prisma.userRole.upsert({
    where: {
      name: "User",
    },
    update: {},
    create: {
      name: "User",
      position: 1,
    },
  });

  await prisma.userRole.upsert({
    where: {
      name: "Moderator",
    },
    update: {},
    create: {
      name: "Moderator",
      position: 2,
      abilities: {
        connect: [{ slug: "deleteUserComment" }, { slug: "editUser" }],
      },
    },
  });

  await prisma.userRole.upsert({
    where: {
      name: "Admin",
    },
    update: {},
    create: {
      name: "Admin",
      position: 3,
      abilities: {
        connect: [
          { slug: "deleteUserComment" },
          { slug: "superviseForum" },
          { slug: "editUser" },
          { slug: "editUserRole" },
          { slug: "banUser" },
        ],
      },
    },
  });

  await prisma.userRole.upsert({
    where: {
      name: "Developer",
    },
    update: {},
    create: {
      name: "Developer",
      position: 4,
      abilities: {
        connect: [
          { slug: "deleteUserComment" },
          { slug: "superviseForum" },
          { slug: "editUser" },
          { slug: "editUserRole" },
          { slug: "banUser" },
          { slug: "deleteUser" },
        ],
      },
    },
  });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
