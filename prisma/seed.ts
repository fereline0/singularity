import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.ability.createMany({
    data: [
      { slug: "deleteUser" },
      { slug: "deleteUserComment" },
      { slug: "superviseForum" },
      { slug: "editUser" },
      { slug: "editUserRole" },
      { slug: "ban" },
    ],
    skipDuplicates: true,
  });

  await prisma.role.upsert({
    where: {
      name: "User",
    },
    update: {},
    create: {
      name: "User",
      color: "#a3a3a3",
    },
  });

  await prisma.role.upsert({
    where: {
      name: "Moderator",
    },
    update: {},
    create: {
      name: "Moderator",
      color: "#60bd53",
      abilities: {
        connect: [{ slug: "deleteUserComment" }, { slug: "editUser" }],
      },
    },
  });

  await prisma.role.upsert({
    where: {
      name: "Admin",
    },
    update: {},
    create: {
      name: "Admin",
      color: "#ff0000",
      abilities: {
        connect: [
          { slug: "deleteUserComment" },
          { slug: "superviseForum" },
          { slug: "editUser" },
          { slug: "editUserRole" },
          { slug: "ban" },
        ],
      },
    },
  });

  await prisma.role.upsert({
    where: {
      name: "Developer",
    },
    update: {},
    create: {
      name: "Developer",
      color: "linear-gradient(to right, #d77bff, #8796ff)",
      abilities: {
        connect: [
          { slug: "deleteUserComment" },
          { slug: "superviseForum" },
          { slug: "editUser" },
          { slug: "editUserRole" },
          { slug: "ban" },
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
