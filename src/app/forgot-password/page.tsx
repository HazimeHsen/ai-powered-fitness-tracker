"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // For passwordless, we just send magic link via NextAuth Email provider
      await signIn("email", { email, callbackUrl: "/" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/signin" className="text-sm text-gray-600 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Link>
        </div>
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="text-sm text-gray-600">Enter your email to receive a login link.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="text-left">
            <Label>Email</Label>
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Send login link
          </Button>
        </form>
      </div>
    </div>
  );
}


