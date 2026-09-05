import "dotenv/config";
import bcrypt from "bcrypt";
import pool from "../db/pool";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

async function createAdmin() {
    if (!email || !password) {
        throw new Error(
            "ADMIN_EMAIL and ADMIN_PASSWORD are required."
        );
    }

    if (password.length < 12) {
        throw new Error(
            "Admin password must be at least 12 characters long."
        );
    }


    const passwordHash = await bcrypt.hash(password, 12);


    const result = await pool.query(
        `
        INSERT INTO admin_users (
            email,
            password_hash
        )
        VALUES ($1, $2)

        ON CONFLICT (email)
        DO UPDATE SET
            password_hash = EXCLUDED.password_hash,
            updated_at = CURRENT_TIMESTAMP

        RETURNING
            id,
            email,
            created_at,
            updated_at;
        `,
        [
            email,
            passwordHash,
        ]
    );

    console.log("Admin account created successfully:");
    console.log(result.rows[0]);
}

createAdmin()
    .catch((error) => {
        console.error("Unable to create admin:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await pool.end();
    });