-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    CONSTRAINT "Tasks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
