/*
  Warnings:

  - You are about to drop the column `exires_in` on the `activation_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activation_tokens" DROP COLUMN "exires_in",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
