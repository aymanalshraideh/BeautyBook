/*
  Warnings:

  - You are about to drop the `staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_staffId_fkey`;

-- DropIndex
DROP INDEX `Appointment_staffId_fkey` ON `appointment`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `specialization` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `staff`;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
