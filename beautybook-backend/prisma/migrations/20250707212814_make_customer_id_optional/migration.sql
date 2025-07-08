-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_customerId_fkey`;

-- DropIndex
DROP INDEX `Appointment_customerId_fkey` ON `appointment`;

-- AlterTable
ALTER TABLE `appointment` MODIFY `customerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
