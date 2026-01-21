import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization header required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 },
      );
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/requests/${id}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      },
    );

    const data = response.data;

    // Kembalikan sesuai format yang diharapkan frontend
    return NextResponse.json({
      success: true,
      data: data, // sesuaikan dengan struktur response backend kamu
    });
  } catch (error) {
    console.error("Error di detailrequestakun:", error?.message || error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data || { message: "Error from backend" },
        { status: error.response.status || 500 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
