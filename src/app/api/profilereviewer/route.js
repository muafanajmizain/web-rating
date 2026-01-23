import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/reviews/dashboard/profile`,{
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
