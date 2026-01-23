import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
        const authHeader = request.headers.get('authorization');
        const { id, status } = await request.json();
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/requests/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                },
                body: JSON.stringify({
                    status: status
                }) // Adjust body as needed
            }
        );
        const data = response.data;

        if (!data.success) {
            return NextResponse.json(data, { status: 401 });
        }
        return NextResponse.json(data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(error.response.data, {
                status: error.response.status,
            });
        }
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}