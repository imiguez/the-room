export const useLogout = () => {
  
  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`);
    window.location.href = '/';
  }

  return {
    logout,
  }
}