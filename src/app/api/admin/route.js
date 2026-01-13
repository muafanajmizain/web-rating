// scr/app/api/admin/route.js

// import { NextResponse } from 'next/server';
import axios from "axios";

export const getSummary = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/summary`
    );

    return response.data;
  } catch (error) {
    return (
      error?.response?.data || {
        success: false,
        message: "Terjadi kesalahan",
      }
    );
  }
};

export const getAllSchool = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/schools`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return (
      error?.response?.data || {
        success: false,
        message: "Terjadi kesalahan",
      }
    );
  }
};

export async function GET(request) {
  try {
    // Ambil token dari header
    const token = request.headers.get("authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    // Ambil query params
    const { searchParams } = new URL(request.url);
    const nama = searchParams.get("nama");
    const npsn = searchParams.get("npsn");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/schools`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          nama,
          npsn,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching schools:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
