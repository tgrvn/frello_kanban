/*
  Warnings:

  - You are about to drop the column `createdAt` on the `user_devices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_devices" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_activity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
