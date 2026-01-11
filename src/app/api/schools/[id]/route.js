import { NextResponse } from "next/server";

export async function GET(request, { params }) {
<<<<<<< HEAD
    try {
        const token = request.headers.get('Authorization');
        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Token tidak ditemukan' },
                { status: 401 }
            );
        }

        const { id } = params;
        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { success: false, message: 'ID tidak valid' },
                { status: 400 }
            );
        }

        const res = await fetch(
            `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                cache: 'no-store',
            }
        );

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            console.error('Backend returned non-JSON:', text);
            return NextResponse.json(
                { success: false, message: 'Backend mengembalikan response tidak valid' },
                { status: 500 }
            );
        }

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Error fetching school detail:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
=======
  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const { id } = params;

    console.log("Fetching school detail with ID:", id);

    const res = await fetch(
      `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    console.log("Backend response status:", res.status);

    // Cek apakah response adalah JSON
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
    console.error("Error fetching school detail:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT - Update school by ID
export async function PUT(request, { params }) {
  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();

    console.log("Updating school with ID:", id);
    console.log("Update data:", body);

    const res = await fetch(
      `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      }
    );

    console.log("Backend response status:", res.status);

    // Cek apakah response adalah JSON
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
    console.error("Error updating school:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete school by ID
export async function DELETE(request, { params }) {
  try {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
>>>>>>> 678035897f2551a7966c079e0552d0c0e41261cb
    }

    const { id } = params;

    console.log("Deleting school with ID:", id);

    const res = await fetch(
      `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    console.log("Backend response status:", res.status);

    // Cek apakah response adalah JSON
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
    console.error("Error deleting school:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
