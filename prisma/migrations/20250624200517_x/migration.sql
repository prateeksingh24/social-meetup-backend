-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('HINDU', 'MUSLIM', 'SIKH', 'CHRISTIAN', 'JAIN', 'BUDDHIST', 'PARSI', 'OTHER');

-- CreateEnum
CREATE TYPE "RelationshipStatus" AS ENUM ('SINGLE', 'IN_RELATIONSHIP', 'MARRIED', 'COMPLICATED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "whatsappNumber" TEXT,
    "aadhaarNumber" TEXT NOT NULL,
    "religion" "Religion" NOT NULL,
    "city" TEXT NOT NULL,
    "relationshipStatus" "RelationshipStatus",
    "bio" VARCHAR(200),
    "hobbies" TEXT[],
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNumber_key" ON "User"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_whatsappNumber_key" ON "User"("whatsappNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
