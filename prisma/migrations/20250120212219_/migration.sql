-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('Income', 'Expense');

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "operation_type" "OperationType" NOT NULL DEFAULT 'Expense';

-- AlterTable
ALTER TABLE "operations" ADD COLUMN     "operation_type" "OperationType" NOT NULL DEFAULT 'Expense';
