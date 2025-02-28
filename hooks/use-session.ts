"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";

interface CustomSession {
  user: { email: string } | null;
  accessToken: string | null;
}

const useSession = () => {
  const [session, setSession] = useState<CustomSession | null>(null);
  const pathname = usePathname()

  useEffect(() => {
    const storedToken = Cookies.get("access_token");

    if (storedToken) {
      try {
        const decodedToken = jwtDecode<{ email: string }>(storedToken);

        const user = { email: decodedToken?.email || "" };

        setSession({
          user,
          accessToken: storedToken,
        });
      } catch (e) {
        console.error("Failed to decode token:", e);
        setSession(null);
      }
    }
  }, [pathname]);

  const setCustomSession = (sessionData: CustomSession) => {
    Cookies.set("access_token", sessionData.accessToken || "", { expires: 1 });
    setSession(sessionData);
  };

  const clearCustomSession = () => {
    Cookies.remove("access_token");
    setSession(null);
  };

  return {
    session,
    setCustomSession,
    clearCustomSession,
  };
};

export default useSession;
