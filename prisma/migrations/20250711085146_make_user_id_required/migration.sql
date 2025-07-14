/*
  Warnings:

  - Made the column `userId` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_userId_fkey";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
