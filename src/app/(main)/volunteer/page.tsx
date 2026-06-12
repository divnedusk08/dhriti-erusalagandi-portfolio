"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    date: "2024 - Present",
    description: "Dedicated to providing compassionate companionship and emotional support to patients and their families. Assisting with non-medical needs and ensuring a comforting environment for those in palliative care.",
    icon: Heart,
  },
  {
    id: "v2",
    organization: "Parinama Academy",
    role: "Community Education Volunteer",
    date: "2023 - Present",
    description: "Supporting educational initiatives and community outreach programs. Assisting in organizing workshops and providing tutoring support to students, fostering a positive learning environment.",
    icon: BookOpen,
  },
];

function VolunteerCard({ item, index }: { item: Volunteer; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y - height / 2) / (height / 2) * -8;
    const rotateY = (x - width / 2) / (width / 2) * 8;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <div
      className="stagger-item h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className="h-full"
      >
        <Card className="flex flex-col h-full overflow-hidden shadow-lg border-accent/20 bg-card/80 backdrop-blur-sm rounded-3xl">
          <CardHeader className="bg-muted/30 p-6">
            <div className="flex items-start gap-4">
              <span className="rounded-full bg-primary/10 p-3 text-primary">
                <item.icon className="h-6 w-6" />
              </span>
              <div>
                <CardTitle className="text-xl font-semibold text-primary">
                  {item.organization}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {item.role}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-6">
            <p className="mb-4 text-foreground/90">{item.description}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>{item.date}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VolunteerSection() {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Volunteer Experience
        </h2>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          Giving back to the community and making a difference.
        </p>
      </header>

      <div
        ref={containerRef}
        className={cn(
          "grid gap-8 md:grid-cols-2 stagger-fade-in-container",
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
