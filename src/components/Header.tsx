"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const getLinkClass = (path: string, exact: boolean = false) => {
    const isActive = exact ? pathname === path : pathname?.startsWith(path);
    return isActive
      ? "transition-colors text-brand-400 font-semibold border-b-2 border-brand-400 pb-1"
      : "transition-colors hover:text-foreground/80 text-foreground/60 pb-1";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-brand-600 p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-purple-400">
                Bizleap AI
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium pt-1">
              <Link href="/dashboard" className={getLinkClass("/dashboard", true)}>Executive Summary</Link>
              <Link href="/dashboard/market-gaps" className={getLinkClass("/dashboard/market-gaps")}>Market Gaps</Link>
              <Link href="/dashboard/recommendations" className={getLinkClass("/dashboard/recommendations")}>Recommendations</Link>
              <Link href="/dashboard/comparison" className={getLinkClass("/dashboard/comparison")}>Comparison</Link>
              <Link href="/dashboard/perspectives" className={getLinkClass("/dashboard/perspectives")}>Perspectives</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/analysis" className="hidden sm:flex">
              <Button className="bg-brand-600 hover:bg-brand-700">New Analysis</Button>
            </Link>
            <div className="h-8 w-8 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/50 text-sm font-medium text-brand-400">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
