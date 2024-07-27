/*
  Warnings:

  - The values [CONFIRMED,CANCELLED] on the enum `Ticket_ticketKind` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Ticket` MODIFY `ticketKind` ENUM('HALF', 'FULL') NOT NULL;
