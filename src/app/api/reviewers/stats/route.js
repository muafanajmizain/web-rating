import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
        const authHeader = request.headers.get('authorization');
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/reviews/dashboard/stats`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                },
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