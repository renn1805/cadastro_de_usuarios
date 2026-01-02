import express from "express"
import cors from "cors"
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
// import { PrismaClient } from './generated/prisma';

const adapter = new PrismaBetterSqlite3({
    url: "file:./prisma/dev.db"
}, {
    timestampFormat: 'unixepoch-ms'
})

// const prisma = new PrismaClient({ adapter })

const app = express()

app.use(express.json())
app.use(cors())

export { app }

