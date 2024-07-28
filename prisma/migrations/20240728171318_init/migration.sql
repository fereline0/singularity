-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBans" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "activity" BOOLEAN NOT NULL DEFAULT true,
    "expires" TIMESTAMP(3) NOT NULL,
    "initiatorId" TEXT NOT NULL,

    CONSTRAINT "UserBans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleAbility" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "RoleAbility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserComment" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" TEXT,
    "writerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetailInformation" (
    "id" TEXT NOT NULL,
    "aboutMe" TEXT,
    "occupation" TEXT,
    "interests" TEXT,
    "gender" TEXT,
    "bithday" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserDetailInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleAbilityToUserRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_color_key" ON "UserRole"("color");

-- CreateIndex
CREATE UNIQUE INDEX "RoleAbility_slug_key" ON "RoleAbility"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetailInformation_userId_key" ON "UserDetailInformation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleAbilityToUserRole_AB_unique" ON "_RoleAbilityToUserRole"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleAbilityToUserRole_B_index" ON "_RoleAbilityToUserRole"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBans" ADD CONSTRAINT "UserBans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBans" ADD CONSTRAINT "UserBans_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserComment" ADD CONSTRAINT "UserComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "UserComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserComment" ADD CONSTRAINT "UserComment_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserComment" ADD CONSTRAINT "UserComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetailInformation" ADD CONSTRAINT "UserDetailInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleAbilityToUserRole" ADD CONSTRAINT "_RoleAbilityToUserRole_A_fkey" FOREIGN KEY ("A") REFERENCES "RoleAbility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleAbilityToUserRole" ADD CONSTRAINT "_RoleAbilityToUserRole_B_fkey" FOREIGN KEY ("B") REFERENCES "UserRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
