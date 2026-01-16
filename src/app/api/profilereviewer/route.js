import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { user_id } = await request.json();
    const authHeader = request.headers.get("authorization");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/reviewer/profile/${user_id}`, //user_id dikirim untuk parameter pengambilan profile
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader
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
