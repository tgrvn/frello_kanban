-- AlterTable
ALTER TABLE "activation_tokens" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "expires_in" DROP NOT NULL;

-- AlterTable
ALTER TABLE "logs" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expires_in" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "is_activated" DROP NOT NULL,
ALTER COLUMN "is_accepted_terms" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
