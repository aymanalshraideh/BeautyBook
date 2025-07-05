/*
  Warnings:

  - You are about to drop the column `clientName` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_staffId_fkey`;

-- DropIndex
DROP INDEX `Appointment_staffId_fkey` ON `appointment`;

-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `clientName`,
    ADD COLUMN `customerId` INTEGER NOT NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    MODIFY `staffId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
