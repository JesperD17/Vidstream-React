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
            {
                status: 500,
            }
        );
    }
}

// edit
export async function PUT(request) {
    const { id, password_hash } = await request.json();

    const database = await createConnection()

    const updateUser = await database.query({
        query: `UPDATE users SET password_hash = ? WHERE id = ?`,
        values: [password_hash, id],
    });

    const result = updateUser.affectedRows;
    let message = result ? "success" : "error";

    const product = {
        id: id,
        password_hash: password_hash,
    };

    return new Response(JSON.stringify({
        message: message,
        status: 200,
        product: product
    }), { headers: { 'Content-Type': 'application/json' } });

}