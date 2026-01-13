// src/app/api/reviews/[id]/route.js

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params; // Ambil review ID dari URL

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/reviews/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Gagal mengambil detail review",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching review detail:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
