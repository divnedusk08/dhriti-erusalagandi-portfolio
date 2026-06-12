"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Brain, Lightbulb, Microscope } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { cn } from "@/lib/utils";
import AchievementsSection from "@/app/(main)/achievements/page";
import ProjectsSection from "@/app/(main)/projects/page";
import ContactSection from "@/app/(main)/contact/page";
import VolunteerSection from "@/app/(main)/volunteer/page";
import { FloatingPaths } from "@/components/ui/background-paths";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y - height / 2) / (height / 2) * -10;
    const rotateY = (x - width / 2) / (width / 2) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn("h-full", className)}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentBio] = useState<string>(
    "I'm a passionate freshman at Rouse High School with a strong interest in biomedical engineering, innovation, and problem-solving. I enjoy exploring how science and technology can be used to improve lives and create meaningful solutions to real-world challenges. Through academics, leadership experiences, volunteer work, and personal projects, I continuously seek opportunities to learn, grow, and make a positive impact. Outside of school, I enjoy coding, building projects, and exploring new technologies, which allow me to combine creativity with critical thinking and bring ideas to life."
  );

  const fullTitle = "Hi, I'm Dhriti";
  const [typedTitle, setTypedTitle] = useState("");
  const [isCursorInDOM, setIsCursorInDOM] = useState(true);
  const [cursorAnimationClass, setCursorAnimationClass] = useState('animate-blink');

  const [whoIAmRef, isWhoIAmVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [interestsRef, isInterestsVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (isLoading) return;

    let typingTimeoutId: NodeJS.Timeout;
    let cursorBlinkTimeoutId: NodeJS.Timeout;
    let cursorFadeTimeoutId: NodeJS.Timeout;

    if (typedTitle.length < fullTitle.length) {
      setCursorAnimationClass('animate-blink');
      setIsCursorInDOM(true);
      typingTimeoutId = setTimeout(() => {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
      }, 100);
    } else {
      setCursorAnimationClass('animate-blink');
      cursorBlinkTimeoutId = setTimeout(() => {
        setCursorAnimationClass('animate-fade-out');
        cursorFadeTimeoutId = setTimeout(() => {
          setIsCursorInDOM(false);
        }, 50); 
      }, 150);
    }

    return () => {
      clearTimeout(typingTimeoutId);
      clearTimeout(cursorBlinkTimeoutId);
      clearTimeout(cursorFadeTimeoutId);
    };
  }, [typedTitle, fullTitle, isLoading]);

  if (isLoading) {
    return <Preloader onLoaded={() => setIsLoading(false)} />;
  }

  const areasOfInterest = [
    {
      icon: Microscope,
      title: "Biomedical Tech",
      description: "Exploring the intersection of engineering and healthcare to improve lives.",
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Tackling complex challenges with critical thinking and scientific inquiry.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Bringing creative ideas to life through prototyping and experimentation.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="about" className="relative overflow-hidden flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center px-4 pt-16 pb-8 md:pt-24 md:pb-12 bg-background">
          <div className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            typedTitle.length > 0 ? "opacity-100" : "opacity-0"
          )}>
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className={cn(
              "mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm transition-all duration-700",
              typedTitle.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <span>Student</span>
              <span className="text-muted-foreground/50">•</span>
              <span>Leader</span>
              <span className="text-muted-foreground/50">•</span>
              <span>Innovator</span>
            </div>
            <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-indigo-500 to-secondary bg-clip-text text-transparent sm:text-7xl md:text-8xl pb-2 min-h-[1.2em]">
              {typedTitle}
              {isCursorInDOM && <span className={`typewriter-cursor ${cursorAnimationClass} text-foreground`}>|</span>}
            </h1>
            <p className={cn(
              "mt-6 max-w-2xl font-[var(--font-lora)] text-lg sm:text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-300",
              typedTitle.length >= fullTitle.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Aspiring Biomedical Engineer and Entrepreneur | Rouse High School | Class of 2030
            </p>
            <div className={cn(
              "mt-10 flex flex-row gap-4 items-center justify-center transition-all duration-1000 delay-500",
              typedTitle.length >= fullTitle.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <a
                href="https://canva.link/33nqckkbyiwxj2v"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-base font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105"
              >
                View Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card/40 backdrop-blur-sm px-6 py-3 text-base font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-muted/40 hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
            <div className={cn(
              "mt-12 flex flex-col items-center transition-opacity duration-1000 delay-700",
              typedTitle.length >= fullTitle.length ? "opacity-100" : "opacity-0"
            )}>
              <p className="text-lg text-muted-foreground animate-subtle-blink">Scroll down to explore</p>
              <ChevronDown className="h-10 w-10 text-muted-foreground mt-1 animate-bobbing" />
            </div>
          </div>
        </section>

        {/* About Me Details Section */}
        <section className="py-12 md:py-16 bg-primary/5 dark:bg-primary/5 border-y border-border">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-10">About Me</h2>
            
            <section 
              ref={whoIAmRef}
              className={cn(
                "mb-10 fade-in-up",
                { "is-visible": isWhoIAmVisible }
              )}
            >
              <h3 className="mb-3 text-xl font-semibold text-primary">
                Who I Am
              </h3>
              <div className="prose prose-xl max-w-none text-foreground/90 dark:prose-invert">
                <p>{currentBio}</p>
              </div>
            </section>

            <section 
              ref={interestsRef}
              className={cn(
                "mb-16 stagger-fade-in-container",
                { "is-visible": isInterestsVisible }
              )}
            >
              <h3 className="mb-6 text-xl font-semibold text-primary">
                Areas of Interest
              </h3>
              <div className="grid gap-8 md:grid-cols-3">
                {areasOfInterest.map((interest, index) => (
                  <div 
                    key={index} 
                    className="stagger-item"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <TiltCard>
                      <div className="group flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] h-full">
                        <interest.icon className="h-12 w-12 mb-4 text-primary transition-colors duration-300 group-hover:text-secondary" />
                        <h4 className="mb-1 text-lg font-medium text-foreground">{interest.title}</h4>
                        <p className="text-sm text-muted-foreground">{interest.description}</p>
                      </div>
                    </TiltCard>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section id="achievements" className="py-12 md:py-16 bg-background">
          <AchievementsSection />
        </section>

        <section id="volunteer" className="py-12 md:py-16 bg-primary/5 dark:bg-primary/5 border-y border-border">
          <VolunteerSection />
        </section>

        <section id="projects" className="py-12 md:py-16 bg-background">
          <ProjectsSection />
        </section>

        <section id="contact" className="py-12 md:py-16 bg-background">
          <ContactSection />
        </section>

      </main>
      <Footer />
    </div>
  );
}