import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter()
  
  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`);
    router.refresh();
  }

  return {
    logout,
  }
}