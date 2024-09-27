import { logout } from "cookie-handler";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  fetch(`${process.env.NEST_HOST_URL}/api/auth/logout`, {
    headers: {
      'cookie': 'connect.sid='+cookies().get('connect.sid')?.value
    }
  }).catch(e => console.log(e));
  await logout();
  return NextResponse.next();
}