// src/app/api/reviews/school/[id]/route.js

import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { id } = params; // Ambil school ID dari URL parameter

        // Kirim request ke backend eksternal
        const res = await fetch(
            `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/reviews/school/${id}`,
            {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    // Jika butuh token dari client, bisa ambil dari header
                    // "Authorization": request.headers.get("Authorization") || ""
                },
            }
        );

        // Ambil response dari backend
        const data = await res.json();

        // Cek jika request gagal
        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: data.message || 'Gagal mengambil data review' }, 
                { status: res.status }
            );
        }

        // Return data sukses
        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}
