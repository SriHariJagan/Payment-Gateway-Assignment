import { NextResponse } from "next/server";

export async function POST() {
  const random = Math.random();

  await new Promise((resolve) =>
    setTimeout(resolve, 2000)
  );

  if (random < 0.6) {
    return NextResponse.json({
      status: "success",
    });
  }

  if (random < 0.85) {
    return NextResponse.json({
      status: "failed",
      reason: "Insufficient funds",
    });
  }

  await new Promise((resolve) =>
    setTimeout(resolve, 8000)
  );

  return NextResponse.json({
    status: "timeout",
  });
}