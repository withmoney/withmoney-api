-- CreateEnum
CREATE TYPE "CreditCardBrand" AS ENUM ('AmericanExpress', 'BNDES', 'Dinners', 'ELO', 'HiperCard', 'MasterCard', 'Other', 'SoroCard', 'Visa');

-- AlterTable
ALTER TABLE "Operation" ADD COLUMN     "creditCardId" TEXT;

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" "CreditCardBrand" NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditCard" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD FOREIGN KEY ("creditCardId") REFERENCES "CreditCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
