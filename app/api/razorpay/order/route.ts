import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId, courseTitle, amount, studentName, studentEmail } = body;

    if (!courseId || !amount) {
      return NextResponse.json(
        { error: "Course ID and amount are required." },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay live/test credentials are configured
    if (keyId && keySecret && !keyId.includes("placeholder")) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // amount in paise
          currency: "INR",
          receipt: `rcpt_${Date.now().toString().slice(-8)}`,
          notes: {
            courseId,
            courseTitle,
            studentName,
            studentEmail,
          },
        }),
      });

      const orderData = await res.json();
      return NextResponse.json(orderData);
    }

    // Demo/Development fallback order
    const mockOrderId = `order_${Date.now()}`;
    return NextResponse.json({
      id: mockOrderId,
      entity: "order",
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      status: "created",
      isDemo: true,
      keyId: keyId || "rzp_test_fashionart_demo",
    });
  } catch (error: unknown) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
