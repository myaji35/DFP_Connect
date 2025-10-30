/*
  Warnings:

  - You are about to drop the column `location` on the `service_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `service_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `reservationDate` on the `service_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `service_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `service_reservations` table. All the data in the column will be lost.
  - Added the required column `applicationId` to the `service_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservedDate` to the `service_reservations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_service_reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "applicationId" TEXT NOT NULL,
    "reservedDate" DATETIME NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT,
    "note" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "adminNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "service_reservations_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "service_applications" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_service_reservations" ("createdAt", "endTime", "id", "startTime", "status", "updatedAt") SELECT "createdAt", "endTime", "id", "startTime", "status", "updatedAt" FROM "service_reservations";
DROP TABLE "service_reservations";
ALTER TABLE "new_service_reservations" RENAME TO "service_reservations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
