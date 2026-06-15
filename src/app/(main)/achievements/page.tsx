"use client";

import * as React from "react";
import { CalendarDays, ExternalLink, Lightbulb, UserCheck, HeartPulse } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  date: string;
  description: string;
  icon: React.ElementType;
  category: "Award" | "Certification" | "Recognition" | "Leadership";
  certificateUrl?: string;
}

const achievementsData: Achievement[] = [
  {
    id: "6",
    title: "Entrepreneur of the Year",
    issuer: "Lisa Hood",
    date: "May 24, 2025",
    description: "Being recognized as Entrepreneur of the Year is an honor that reflects my passion for innovation, problem-solving, and turning ideas into action. This achievement represents my commitment to creativity, leadership, and making a real impact through projects that matter.",
    icon: Lightbulb,
    category: "Award",
    certificateUrl: "https://www.canva.com/design/DAGoyKfr944/ruAXSbeMeYR8GYsFBr_2fQ/view?utm_content=DAGoyKfr944&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h573e089b61",
  },
  {
    id: "8",
    title: "NJHS Officer",
    issuer: "National Junior Honor Society",
    date: "2024 - 2025",
    description: "Serving as an officer for the National Junior Honor Society, where I lead service initiatives and represent the student body through scholarship, leadership, and character development.",
    icon: UserCheck,
    category: "Leadership",
  },
  {
    id: "10",
    title: "CPR Certification",
    issuer: "National CPR Foundation",
    date: "2026",
    description: "I'm CPR certified through the National CPR Foundation, demonstrating my commitment to safety and preparedness in emergency situations.",
    icon: HeartPulse,
    category: "Certification",
  },
];

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  return (
    <article
      className="stagger-item group flex h-full flex-col rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-5 flex items-center justify-between">
        <achievement.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
        <span className="eyebrow text-[0.65rem]">{achievement.category}</span>
      </div>
      <h3 className="text-lg font-medium text-foreground">{achievement.title}</h3>
      {achievement.issuer && (
        <p className="mt-1 text-sm text-muted-foreground">{achievement.issuer}</p>
      )}
      <p className="mt-4 flex-grow text-sm leading-relaxed text-muted-foreground">
        {achievement.description}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-2 h-3.5 w-3.5" />
          {achievement.date}
        </span>
        {achievement.certificateUrl && (
          <a
            href={achievement.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center text-xs font-medium text-foreground"
          >
            Certificate <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function AchievementsSection() {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-4">Achievements</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Awards, certifications &amp; recognition
        </h2>
      </header>

      <div
        ref={containerRef}
        className={cn(
          "grid gap-5 md:grid-cols-2 stagger-fade-in-container",
          { "is-visible": isVisible }
        )}
      >
        {achievementsData.map((achievement, index) => (
          <AchievementCard key={achievement.id} achievement={achievement} index={index} />
        ))}
      </div>
       {achievementsData.length === 0 && (
        <p className="text-center text-muted-foreground">No achievements to display yet.</p>
      )}
    </div>
  );
}
