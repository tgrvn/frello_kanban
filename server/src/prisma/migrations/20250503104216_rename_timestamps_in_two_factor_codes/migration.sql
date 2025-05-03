/*
  Warnings:

  - You are about to drop the column `createdAt` on the `two_factor_codes` table. All the data in the column will be lost.
  - You are about to drop the column `expiresIn` on the `two_factor_codes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "two_factor_codes" DROP COLUMN "createdAt",
DROP COLUMN "expiresIn",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
