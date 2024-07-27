/*
  Warnings:

  - The values [PENDING,CONFIRMED,CANCELLED] on the enum `ReservationHistory_ticketKind` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING] on the enum `Ticket_ticketKind` will be removed. If these variants are still used in the database, this will fail.
  - The values [OPEN,CLOSED] on the enum `Spot_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `Ticket` table. All the data in the column will be lost.
  - The values [PENDING] on the enum `Ticket_ticketKind` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[spotId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ReservationHistory` MODIFY `ticketKind` ENUM('HALF', 'FULL') NOT NULL,
    MODIFY `status` ENUM('CONFIRMED', 'CANCELLED') NOT NULL;

-- AlterTable
ALTER TABLE `Spot` MODIFY `status` ENUM('AVAILABLE', 'RESERVED') NOT NULL;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `status`,
    MODIFY `ticketKind` ENUM('CONFIRMED', 'CANCELLED') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ticket_spotId_key` ON `Ticket`(`spotId`);
