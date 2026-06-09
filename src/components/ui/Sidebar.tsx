"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Target,
  BarChart3,
  TrendingUp,
  Crosshair,
  Swords,
  Activity,
  Lightbulb
} from "lucide-react";

const sidebarLinks = [
  { name: "Executive Summary", href: "/dashboard", icon: LayoutDashboard },
  { name: "Market Share", href: "/dashboard#market-share", icon: Target },
  { name: "Positioning Matrix", href: "/dashboard/positioning", icon: Crosshair },
  { name: "AI SWOT Analysis", href: "/dashboard/swot", icon: BarChart3 },
  { name: "Market Trends", href: "/dashboard/trends", icon: TrendingUp },
  { name: "Battle Cards", href: "/dashboard/battle-cards", icon: Swords },
  { name: "Live Monitoring", href: "/dashboard/live-feed", icon: Activity },
  { name: "Recommendations", href: "/dashboard/recommendations", icon: Lightbulb },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block border-r border-white/10 bg-black/40 backdrop-blur-md h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="py-6 px-4">
        <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Intelligence Hub
        </h3>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-600/20 text-brand-400"
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                )}
              >
                <link.icon className={cn("w-5 h-5", isActive ? "text-brand-400" : "text-muted-foreground")} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
