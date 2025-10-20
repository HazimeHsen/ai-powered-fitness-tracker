"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/ui/spinner";

export default function SignoutPage() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    // Prevent multiple signout attempts
    if (isSigningOut) return;
    
    setIsSigningOut(true);
    
    const handleSignout = async () => {
      try {
        // Sign out the user
        await signOut({ 
          callbackUrl: "/signin",
          redirect: false 
        });
        
        // Small delay to ensure signout completes
        setTimeout(() => {
          router.push("/signin");
        }, 500);
      } catch (error) {
        console.error("Error during signout:", error);
        // Even if there's an error, redirect to signin
        setTimeout(() => {
          router.push("/signin");
        }, 500);
      }
    };

    // Auto signout on page load
    handleSignout();
  }, [router, isSigningOut]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <PageLoader />
        <h2 className="mt-4 text-lg font-medium text-gray-900">Signing you out...</h2>
        <p className="mt-2 text-sm text-gray-600">Please wait while we log you out.</p>
      </div>
    </div>
  );
}
