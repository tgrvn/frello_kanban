/*
  Warnings:

  - You are about to drop the column `exiresIn` on the `activation_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activation_tokens" DROP COLUMN "exiresIn",
ADD COLUMN     "exires_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
