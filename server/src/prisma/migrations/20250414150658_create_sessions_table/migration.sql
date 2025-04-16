-- AlterTable
ALTER TABLE "users" ALTER COLUMN "is_activated" SET DEFAULT false;

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "ua" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_id_key" ON "sessions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");
