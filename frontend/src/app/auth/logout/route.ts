import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "../../../cookie-handler";


export async function GET(request: Request) {
  const f =  await fetch(`${process.env.NEST_HOST_URL}/api/auth/logout`, {
    headers: {
      'cookie': 'connect.sid='+cookies().get('connect.sid')?.value
    }
  });
  if (!f.ok) redirect(process.env.NEXT_PUBLIC_BASE_URL!);
  await logout();
}