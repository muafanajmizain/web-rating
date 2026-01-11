// src/app/api/schools/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // const token = request.headers.get('Authorization');
        // if (!token) {
        //     return NextResponse.json(
        //         { success: false, message: 'Token tidak ditemukan' },
        //         { status: 401 }
        //     );
        // }

        const res = await fetch(
            'https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            }
        );

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            console.error('Backend returned non-JSON:', text);
            return NextResponse.json(
                { success: false, message: 'Backend mengembalikan response tidak valid' },
                { status: 500 }
            );
        }

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Error fetching schools:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}