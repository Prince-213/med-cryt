"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: ("admin" | "staff")[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  allowedUserTypes = ["admin", "staff"],
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would make an API call to verify session
        // For now, we'll check localStorage or cookies
        const adminSession = localStorage.getItem("admin_session");
        const staffSession = localStorage.getItem("staff_session");

        if (!adminSession && !staffSession) {
          router.push(redirectTo);
          return;
        }

        // Additional user type checking could be added here
        // based on your client-side state management
      } catch (error) {
        router.push(redirectTo);
      }
    };

    checkAuth();
  }, [router, redirectTo, allowedUserTypes]);

  return <>{children}</>;
}
