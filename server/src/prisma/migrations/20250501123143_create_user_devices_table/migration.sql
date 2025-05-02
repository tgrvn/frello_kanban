/*
  Warnings:

  - You are about to drop the column `fingerprint` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `ua` on the `sessions` table. All the data in the column will be lost.
  - Made the column `created_at` on table `activation_tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expires_in` on table `activation_tokens` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `user_device_id` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Made the column `expires_in` on table `sessions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `sessions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_activated` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_accepted_terms` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "activation_tokens" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "expires_in" SET NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "fingerprint",
DROP COLUMN "ip",
DROP COLUMN "ua",
ADD COLUMN     "last_activity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_device_id" TEXT NOT NULL,
ALTER COLUMN "expires_in" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "is_activated" SET NOT NULL,
ALTER COLUMN "is_accepted_terms" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "user_devices" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "isTrusted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "user_devices_id_key" ON "user_devices"("id");

-- AddForeignKey
ALTER TABLE "user_devices" ADD CONSTRAINT "user_devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_device_id_fkey" FOREIGN KEY ("user_device_id") REFERENCES "user_devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
