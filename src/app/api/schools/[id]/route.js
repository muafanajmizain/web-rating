import { NextResponse } from 'next/server';

// GET - Fetch school by ID
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

        const res = await fetch(
            `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${id}`,
            {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            }
        );

        const data = await res.json();

        if (!data.success) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching school detail:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}

// PUT - Update school by ID
export async function PUT(request, { params }) {
    try {
        const token = request.headers.get('Authorization');
        
        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Token tidak ditemukan' }, 
                { status: 401 }
            );
        }

        const { id } = params;
        const body = await request.json();

        const res = await fetch(
            `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${id}`,
            {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(body)
            }
        );

        const data = await res.json();

        if (!data.success) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating school:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}

// DELETE - Delete school by ID
export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('Authorization');
        
        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Token tidak ditemukan' }, 
                { status: 401 }
            );
        }

        const { id } = params;

        const res = await fetch(
            `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${id}`,
            {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            }
        );

        const data = await res.json();

        if (!data.success) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error deleting school:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}