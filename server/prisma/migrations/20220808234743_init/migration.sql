-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "moves" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "from_black" BOOLEAN NOT NULL,
    "match_id" TEXT NOT NULL,
    CONSTRAINT "moves_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
