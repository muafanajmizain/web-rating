// src/app/api/requests/route.js
import { NextResponse } from "next/server";

// POST - Create account request (public, no auth required)
export async function POST(request) {
  try {
    const formData = await request.formData();

    // Forward the FormData to the backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/requests`,
      {
        method: "POST",
        body: formData,
      }
    );

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Backend response bukan JSON:", text);
      return NextResponse.json(
        {
          success: false,
          message: "Backend mengembalikan response yang tidak valid",
        },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET - Get all account requests
export async function GET(request) {
  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/requests`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Backend response bukan JSON:", text);
      return NextResponse.json(
        {
          success: false,
          message: "Backend mengembalikan response yang tidak valid",
        },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
