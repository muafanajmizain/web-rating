// src/app/api/tanggapan/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get('reviewId');

    if (!reviewId) {
      return NextResponse.json(
        { success: false, message: 'reviewId wajib diisi' },
        { status: 400 }
      );
    }

    // Ambil Authorization dari header request yang masuk ke route internal
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Header Authorization Bearer wajib ada' },
        { status: 401 }
      );
    }

    const targetUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/reviews/${reviewId}/responses`;

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
        Accept: 'application/json',
      },
      // optional:
      // cache: 'no-store',
    });

    const json = await res.json();

    // kalau API target ngirim status error
    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: json?.message || 'Gagal mengambil data', raw: json },
        { status: res.status }
      );
    }

    // kembalikan response target apa adanya
    return NextResponse.json(json, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
