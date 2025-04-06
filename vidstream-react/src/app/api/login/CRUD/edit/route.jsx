import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

// edit
export async function PUT(request) {
    try {
        const database = await createConnection();

        const [id, password_hash] = await request.json();

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