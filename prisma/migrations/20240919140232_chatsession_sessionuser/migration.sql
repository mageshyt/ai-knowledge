/*
  Warnings:

  - The values [WRITE] on the enum `Access` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `SharedSession` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,sessionId]` on the table `SessionUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Access_new" AS ENUM ('READ', 'READ_WRITE', 'ADMIN');
ALTER TABLE "SessionUser" ALTER COLUMN "access" DROP DEFAULT;
ALTER TABLE "SessionUser" ALTER COLUMN "access" TYPE "Access_new" USING ("access"::text::"Access_new");
ALTER TYPE "Access" RENAME TO "Access_old";
ALTER TYPE "Access_new" RENAME TO "Access";
DROP TYPE "Access_old";
ALTER TABLE "SessionUser" ALTER COLUMN "access" SET DEFAULT 'READ';
COMMIT;

-- DropForeignKey
ALTER TABLE "SessionUser" DROP CONSTRAINT "SessionUser_sessionId_fkey";

-- DropTable
DROP TABLE "SharedSession";

-- CreateIndex
CREATE UNIQUE INDEX "SessionUser_userId_sessionId_key" ON "SessionUser"("userId", "sessionId");

-- AddForeignKey
ALTER TABLE "SessionUser" ADD CONSTRAINT "SessionUser_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
