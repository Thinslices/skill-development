-- DropForeignKey
ALTER TABLE "Study" DROP CONSTRAINT "Study_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
