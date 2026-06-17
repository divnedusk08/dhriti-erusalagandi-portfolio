"use client";

import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Award, Briefcase, Mail, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const navItems = [
  { href: "/#about", label: "About", icon: User, sectionId: "about" },
  { href: "/#achievements", label: "Achievements", icon: Award, sectionId: "achievements" },
  { href: "/#volunteer", label: "Volunteer", icon: Heart, sectionId: "volunteer" },
  { href: "/#projects", label: "Projects", icon: Briefcase, sectionId: "projects" },
  { href: "/#contact", label: "Contact", icon: Mail, sectionId: "contact" },
];

export function Header() {
  const [currentHash, setCurrentHash] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', updateHash);
    updateHash();
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  const DesktopNavLink = ({ href, label, sectionId }: { href: string; label: string; sectionId: string }) => {
    const isActive = currentHash === `#${sectionId}` || (sectionId === 'about' && currentHash === '');
    return (
      <Link href={href}>
        <Button
          variant="ghost"
          className={cn(
            "text-sm font-medium transition-colors",
            isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/#about"
          className="flex items-center text-foreground transition-opacity hover:opacity-70 -ml-1"
          aria-label="Dhriti Home"
        >
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <DesktopNavLink key={item.href} {...item} />
          ))}
          <a
            href="https://canva.link/33nqckkbyiwxj2v"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Resume
          </a>
        </nav>

        <div className="md:hidden pr-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsSheetOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-lg">
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <a
                  href="https://canva.link/33nqckkbyiwxj2v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Resume
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
