"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, CalendarDays, ExternalLink, Lightbulb, UserCheck } from "lucide-react";
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
];

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
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
        <Card 
          className="flex flex-col h-full overflow-hidden shadow-lg border-accent/20 bg-card/80 backdrop-blur-sm rounded-3xl"
        >
          <CardHeader className="bg-muted/30 p-6">
            <div className="flex items-start gap-4">
              <span className="rounded-full bg-accent p-3 text-accent-foreground">
                <achievement.icon className="h-6 w-6" />
              </span>
              <div>
                <CardTitle className="text-xl font-semibold text-primary">
                  {achievement.title}
                </CardTitle>
                {achievement.issuer && (
                  <CardDescription className="text-sm text-muted-foreground">
                    {achievement.issuer}
                  </CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-6">
            <p className="mb-4 text-foreground/90">{achievement.description}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>{achievement.date}</span>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-card p-4 flex justify-between items-center">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {achievement.category}
              </span>
              {achievement.certificateUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={achievement.certificateUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Certificate
                  </a>
                </Button>
              )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function AchievementsSection() {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl interactive-text-hover">
          My Achievements
        </h2>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          A showcase of my awards, certifications, and recognitions.
        </p>
      </header>

      <div
        ref={containerRef}
        className={cn(
          "grid gap-8 md:grid-cols-2 stagger-fade-in-container",
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