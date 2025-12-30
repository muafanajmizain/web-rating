import { NextResponse } from 'next/server';

// GET - Fetch all schools
export async function GET(request) {
    try {
        // Ambil token dari header Authorization
        const token = request.headers.get('Authorization');
        
        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Token tidak ditemukan' }, 
                { status: 401 }
            );
        }

        console.log('Fetching schools with token:', token);

        const res = await fetch(
            `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools`,
            {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
        );

        console.log('Backend response status:', res.status);

        // Cek apakah response adalah JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await res.text();
            console.error('Backend response bukan JSON:', text);
            return NextResponse.json(
                { success: false, message: 'Backend mengembalikan response yang tidak valid' }, 
                { status: 500 }
            );
        }

        const data = await res.json();

        if (!data.success) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching schools:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}

// POST - Create new school
export async function POST(request) {
    try {
        const token = request.headers.get('Authorization');
        
        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Token tidak ditemukan' }, 
                { status: 401 }
            );
        }

        // Parse body dari request
        const body = await request.json();

        // Validasi input
        if (!body.nama || !body.npsn) {
            return NextResponse.json(
                { success: false, message: 'Nama dan NPSN harus diisi' }, 
                { status: 400 }
            );
        }

        console.log('Creating school with data:', body);
        console.log('Token:', token);

        const res = await fetch(
            `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools`,
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(body)
            }
        );

        console.log('Backend response status:', res.status);

        // Cek apakah response adalah JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await res.text();
            console.error('Backend response bukan JSON:', text);
            return NextResponse.json(
                { success: false, message: 'Backend mengembalikan response yang tidak valid' }, 
                { status: 500 }
            );
        }

        const data = await res.json();

        if (!data.success) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error creating school:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}