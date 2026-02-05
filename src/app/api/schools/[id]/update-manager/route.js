// src/app/api/schools/[id]/update-manager/route.js
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

// PUT - Update school by manager (pengelola only)
// Supports both JSON and FormData (for file uploads)
export async function PUT(request, { params }) {
  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const contentType = request.headers.get("content-type") || "";

    let body;
    const headers = {
      Authorization: token,
    };

    if (contentType.includes("multipart/form-data")) {
      // Handle FormData for file uploads
      const formData = await request.formData();
      body = formData;
      // Don't set Content-Type for FormData - let fetch set it with boundary
    } else {
      // Handle JSON
      const jsonBody = await request.json();
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(jsonBody);
    }

    const res = await fetch(`${BASE_URL}/api/schools/${id}/update-manager`, {
      method: "PUT",
      headers,
      body,
    });

    const resContentType = res.headers.get("content-type");
    if (!resContentType || !resContentType.includes("application/json")) {
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

    if (!data.success) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating school by manager:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
