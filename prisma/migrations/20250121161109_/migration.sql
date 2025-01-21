/*
  Warnings:

  - You are about to drop the column `operation_type` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "operation_type",
ALTER COLUMN "type" SET DEFAULT 'Expense';

-- DropEnum
DROP TYPE "OperationType";
