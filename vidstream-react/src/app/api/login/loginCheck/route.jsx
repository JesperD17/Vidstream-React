import { NextResponse } from 'next/server';

import { database } from "../CRUD/read/route";

export async function POST(request) {
    try {
        console.log("start");
        
        
        const [mailInput, passInput] = await request.json(); // Parse JSON payload
        console.log(mailInput, passInput); // Debugging: Check if body contains data
        
        if (!mailInput || !passInput) {
            return NextResponse.json({ error: `Missing mail or pass input` }, { status: 400 });
        }
        
        const db = await database()

        return (NextResponse.json({ message: `Payload received! ` + JSON.stringify(db) }));
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}