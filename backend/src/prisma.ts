import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// 1. Создаем пул подключений с помощью стандартного драйвера pg
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Оборачиваем его в официальный адаптер Prisma 7
const adapter = new PrismaPg(pool);

// 3. Передаем адаптер в конструктор клиента
const prisma = new PrismaClient({ adapter });

export default prisma;
