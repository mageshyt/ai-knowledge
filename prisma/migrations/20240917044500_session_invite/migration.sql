/*
  Warnings:

  - You are about to drop the `ArchivedChats` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inviteCode]` on the table `ChatSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviteCode` to the `ChatSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArchivedChats" DROP CONSTRAINT "ArchivedChats_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "SessionUser" DROP CONSTRAINT "SessionUser_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "SessionUser" DROP CONSTRAINT "SessionUser_userId_fkey";

-- AlterTable
ALTER TABLE "ChatSession" ADD COLUMN     "inviteCode" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'New Chat';

-- DropTable
DROP TABLE "ArchivedChats";

-- CreateIndex
CREATE UNIQUE INDEX "ChatSession_inviteCode_key" ON "ChatSession"("inviteCode");

-- CreateIndex
CREATE INDEX "ChatSession_id_idx" ON "ChatSession"("id");

-- CreateIndex
CREATE INDEX "ChatSession_inviteCode_idx" ON "ChatSession"("inviteCode");

-- CreateIndex
CREATE INDEX "Content_id_idx" ON "Content"("id");

-- CreateIndex
CREATE INDEX "Content_chatId_idx" ON "Content"("chatId");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionUser" ADD CONSTRAINT "SessionUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionUser" ADD CONSTRAINT "SessionUser_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SharedSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
