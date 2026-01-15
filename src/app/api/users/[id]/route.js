// src/app/api/users/[id]/route.js
import { NextResponse } from "next/server";

// GET - Get user by ID
export async function GET(request, { params }) {
  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/users/${id}`,
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
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT - Update user by ID
export async function PUT(request, { params }) {
  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
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
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
