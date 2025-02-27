"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { User } from "@supabase/supabase-js";

export default function AuthButton({ user }:{user: User | null}) {
  const pathname = usePathname(); // Lebih stabil daripada referer
  const currentPath = pathname.split("?")[0];

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <>
      <div className="flex items-center gap-4">
        Hey, {user.email}!
        <form action={signOutAction}>
          <Button type="submit" variant={"outline"}>
            Sign out
          </Button>
        </form>
        |
        {currentPath === "/reset-password" ? 
          (
            <Button asChild variant={"outline"}>
              <Link href="/">Home</Link>
            </Button>
          )
        :(
          <Button asChild variant={"outline"}>
            <Link href="/reset-password">Reset Password</Link>
          </Button>
        )}

        <ThemeSwitcher />
      </div>
    </>
  ) : (
    <>
      <div className="flex items-center gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        
        <ThemeSwitcher />
      </div>
    </>
  );
}
