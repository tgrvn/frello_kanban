/*
  Warnings:

  - A unique constraint covering the columns `[userId,code]` on the table `two_factor_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "two_factor_codes_userId_code_key" ON "two_factor_codes"("userId", "code");
