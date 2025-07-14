/*
  Warnings:

  - You are about to drop the column `authorId` on the `Blog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
