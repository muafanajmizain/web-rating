import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        const res = await fetch(`https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();               

        if (!data.success) {
            return NextResponse.json(data, { status: 401 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}