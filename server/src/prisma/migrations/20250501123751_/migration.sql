/*
  Warnings:

  - A unique constraint covering the columns `[user_id,deviceId]` on the table `user_devices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_devices_user_id_deviceId_key" ON "user_devices"("user_id", "deviceId");
