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

// edit
export async function PUT(request) {
    try {
        const database = await createConnection();

        const [ id, password_hash ] = await request.json();

        const result = await database.execute("UPDATE users SET password_hash = ? WHERE id = ?", [
            password_hash,
            id
        ]);

        return NextResponse.json({ id, updatedRows: result.affectedRows });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}


