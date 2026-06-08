
"use client";

import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Award, Briefcase, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const navItems = [
  { href: "/#about", label: "About", icon: User, sectionId: "about" },
  { href: "/#achievements", label: "Achievements", icon: Award, sectionId: "achievements" },
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-2 md:px-4">
        <Link 
          href="/#about" 
          className="flex items-center space-x-2 transition-all duration-300" 
          aria-label="Dhriti Home"
        >
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <DesktopNavLink key={item.href} {...item} />
          ))}
          <a
            href="https://canva.link/33nqckkbyiwxj2v"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4"
          >
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-semibold rounded-xl">
              Resume
            </Button>
          </a>
        </nav>

        <div className="md:hidden">
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
                  className="w-full pt-4"
                >
                  <Button variant="outline" className="w-full border-primary/50 text-primary font-semibold rounded-xl">
                    Resume
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
