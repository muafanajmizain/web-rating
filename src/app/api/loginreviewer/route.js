import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Kirim email sebagai username ke backend (karena backend mungkin tetap pakai field "username")
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/auth/login`,
      { username: email, password }, // <-- email dikirim sebagai username
      {
        headers: {
          "Content-Type": "application/json",
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
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
