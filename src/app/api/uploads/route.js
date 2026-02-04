// src/app/api/uploads/route.js
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

// POST - Upload file
export async function POST(request) {
  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 },
      );
    }

    // Get form data from request
    const formData = await request.formData();

    // Forward the form data to backend
    const res = await fetch(`${BASE_URL}/api/uploads`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Backend response bukan JSON:", text);
      return NextResponse.json(
        {
          success: false,
          message: "Backend mengembalikan response yang tidak valid",
        },
        { status: 500 },
      );
    }

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Gagal mengupload file" },
        { status: res.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "File berhasil diupload",
      data: data.data,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
