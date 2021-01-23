-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('ptBR', 'enUS');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'BRL', 'GBP');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT E'USD';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "Locale" NOT NULL DEFAULT E'enUS';
