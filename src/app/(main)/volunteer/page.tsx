"use client";

import * as React from "react";
import { Heart, BookOpen, CalendarDays } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface Volunteer {
  id: string;
  organization: string;
  role: string;
  date: string;
  description: string;
  icon: React.ElementType;
}

const volunteerData: Volunteer[] = [
  {
    id: "v1",
    organization: "Aspen Hospice Palliative Care",
    role: "Patient Companion & Support Volunteer",
    date: "2025 - Present",
    description: "Dedicated to providing compassionate support to patients and their families. I write 'sunshine cards' to elderly residents to bring joy and companionship, ensuring a comforting environment for those in palliative care.",
    icon: Heart,
  },
  {
    id: "v2",
    organization: "Parinama Academy",
    role: "Community Education Volunteer",
    date: "2026",
    description: "Supporting educational initiatives and community outreach programs. Assisting in organizing workshops and providing tutoring support to students, fostering a positive learning environment.",
    icon: BookOpen,
  },
];

function VolunteerCard({ item, index }: { item: Volunteer; index: number }) {
  return (
    <article
      className="stagger-item flex h-full flex-col rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-5 flex items-start gap-4">
        <item.icon className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary" strokeWidth={1.5} />
        <div>
          <h3 className="text-lg font-medium text-foreground">{item.organization}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
        </div>
      </div>
      <p className="flex-grow text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      <div className="mt-6 flex items-center border-t border-border pt-4 text-xs text-muted-foreground">
        <CalendarDays className="mr-2 h-3.5 w-3.5" />
        {item.date}
      </div>
    </article>
  );
}

export default function VolunteerSection() {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-4">Volunteering</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Giving back to the community
        </h2>
      </header>

      <div
        ref={containerRef}
        className={cn(
          "grid gap-5 md:grid-cols-2 stagger-fade-in-container",
          { "is-visible": isVisible }
        )}
      >
        {volunteerData.map((item, index) => (
          <VolunteerCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
