// scr/app/api/loginpengelola/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. Mengambil data dari request body
    const { username, password } = await request.json();

    // 2. Mengirim request ke backend eksternal
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    // 4. Mengambil respon dari backend
    const data = await res.json();

    // 5. Cek apakah login gagal?
    if (!data.success) {
      return NextResponse.json(data, { status: 401 });
    }

    // 5. Return data sukses
    return NextResponse.json(data);
  } catch (error) {
    // 6. Handle error
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
