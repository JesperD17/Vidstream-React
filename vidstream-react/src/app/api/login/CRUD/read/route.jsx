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