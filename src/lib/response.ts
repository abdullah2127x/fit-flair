// this import the Response type and create two functions success and failure

import { ResponseType } from "@/types/apiResponse";
import { NextResponse } from "next/server";

export function success<T>(data: T, message = "OK", status = 200) {
  return NextResponse.json<ResponseType<T>>(
    { status, success: true, message, data },
    { status }
  );
}

export function failure(
  message: string,
  status = 500,
  code?: string,
  details?: any
) {
  return NextResponse.json<ResponseType>(
    { status, success: false, message, code, details },
    { status }
  );
}
