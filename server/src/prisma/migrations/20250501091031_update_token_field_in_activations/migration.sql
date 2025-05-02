/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `activation_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "activation_tokens_token_key" ON "activation_tokens"("token");
