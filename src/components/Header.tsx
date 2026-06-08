import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex gap-2 items-center mr-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">Bizleap</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</Link>
          <Link href="/analysis" className="transition-colors hover:text-foreground/80 text-foreground/60">Analysis</Link>
          <Link href="/reports" className="transition-colors hover:text-foreground/80 text-foreground/60">Reports</Link>
          <Link href="/competitors" className="transition-colors hover:text-foreground/80 text-foreground/60">Competitors</Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:flex">Settings</Button>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-sm font-medium">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
