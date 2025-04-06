import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

// create
export async function POST(request) {
    try {
        const database = await createConnection()

        const [name, email, password_hash, url_hash] = await request.json();

        const newData = await database.execute("INSERT INTO users (name, email, password_hash, url_hash) VALUES (?, ?, ?, ?)", [
            name,
            email,
            password_hash,
            url_hash
        ]);

        return NextResponse.json({ name, email, password_hash, url_hash, id: newData.insertId });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}