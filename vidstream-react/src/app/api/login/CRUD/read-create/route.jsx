import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

// read
export async function GET() {
    try {
        const database = await createConnection()
        const sql = "SELECT * FROM users"
        const [users] = await database.query(sql)
        return NextResponse.json({ users })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message })
    }
}

// create
export async function POST(request) {
    try {
        const database = await createConnection()

        const [ name, mail, password_hash ] = await request.json();

        console.log(name, mail, password_hash);

        const result = await database.execute("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [
            name,
            mail,
            password_hash,
        ]);

        return NextResponse.json({ name, mail, password_hash, id: result.insertId });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            {
                status: 500,
            }
        );
    }
}