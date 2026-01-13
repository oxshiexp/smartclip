import Link from "next/link";
import { Home, Film, Settings } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/jobs", label: "Jobs", icon: Film },
  { href: "/settings", label: "Settings", icon: Settings }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="hidden w-64 flex-col border-r border-border p-6 md:flex">
          <div className="text-lg font-semibold">SMART-CLIPPER</div>
          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-foreground/5"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <p className="text-sm text-foreground/60">Production-ready YouTube Shorts automation</p>
              <h1 className="text-xl font-semibold">Smart-Clipper Studio</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="badge">Dark / Light</span>
              <button className="button-secondary">New Job</button>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
