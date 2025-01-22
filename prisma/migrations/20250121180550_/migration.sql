/*
  Warnings:

  - Added the required column `account_id` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `payment_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_methods" ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
