/*
  Warnings:

  - You are about to drop the `VideoView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `VideoView` DROP FOREIGN KEY `VideoView_videoId_fkey`;

-- DropTable
DROP TABLE `VideoView`;
