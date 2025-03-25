import { createConnection } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        console.log("start");
        
        
        const [mailInput, passInput] = await request.json(); // Parse JSON payload
        console.log(mailInput, passInput); // Debugging: Check if body contains data
        
        if (!mailInput || !passInput) {
            return NextResponse.json({ error: `Missing mail or pass input` }, { status: 400 });
        }
        
        const database = await createConnection()
        const users = await database

        return (NextResponse.json({ message: `Payload received! ` + JSON.stringify(users) }));
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
