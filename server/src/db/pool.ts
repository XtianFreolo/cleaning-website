import "dotenv/config";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error(
        "DATABASE_URL is missing. Check the server/.env file."
    );
}

const pool = new Pool({
    connectionString: databaseUrl,
});


export default pool;