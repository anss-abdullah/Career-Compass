"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, GraduationCap, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Recommend", icon: BrainCircuit },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/guidance", label: "Guidance", icon: GraduationCap },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  // Function to check if the current path matches the nav item's base path
  const isActive = (href: string) => {
    if (href === "/home") {
      // Special case for home: includes /home and /test/*
      return pathname === href || pathname.startsWith("/test");
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card shadow-inner">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-md transition-colors duration-200",
                active
                  ? "text-primary" // Use primary color for active state (blue from theme)
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
