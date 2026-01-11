// src/app/api/schools/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const token = request.headers.get('Authorization');
        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Token tidak ditemukan' },
                { status: 401 }
            );
        }

        const { id } = params;
        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, message: 'ID tidak valid' },
                { status: 400 }
            );
        }

        const res = await fetch(
            `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
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
        console.error('Error fetching school detail:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}