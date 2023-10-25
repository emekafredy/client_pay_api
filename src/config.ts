require('dotenv').config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST as string;
export const DB_USER = process.env.DB_USER as string;
export const DB_NAME = process.env.DB_NAME as string;
export const DB_PORT = process.env.DB_PORT as unknown as number;
export const DB_PASS = process.env.DB_PASS as string;
