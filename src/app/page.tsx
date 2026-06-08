
"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Code, Brain, Lightbulb } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { cn } from "@/lib/utils";
import AchievementsSection from "@/app/(main)/achievements/page";
import ProjectsSection from "@/app/(main)/projects/page";
import ContactSection from "@/app/(main)/contact/page";
import { FloatingPaths } from "@/components/ui/background-paths";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentBio] = useState<string>(
    "I’m a passionate 8th grader at Stiles Middle School with a strong interest in entrepreneurship, creativity, and making a difference through innovative ideas. I love coming up with original solutions, exploring new projects, and learning through hands-on experience. Outside of that, I enjoy painting—it keeps me inspired and fuels my creativity. I'm always open to new challenges that help me grow and create something meaningful."
  );

  const fullTitle = "Hi, I'm Dhriti";
  const [typedTitle, setTypedTitle] = useState("");
  const [isCursorInDOM, setIsCursorInDOM] = useState(true);
  const [cursorAnimationClass, setCursorAnimationClass] = useState('animate-blink');

  const heroSectionRef = useRef<HTMLElement>(null);

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
      // Typing finished - disappear fast as requested
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
      icon: Code,
      title: "Web Development",
      description: "Building responsive and engaging web experiences with modern technologies.",
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Tackling challenges with analytical thinking and innovative solutions.",
    },
    {
      icon: Lightbulb,
      title: "Entrepreneurship",
      description: "Developing innovative ideas and turning them into impactful ventures.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 page-transition">
        {/* Hero Section */}
        <section id="about" ref={heroSectionRef} className="relative overflow-hidden flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center px-4 pt-16 pb-8 md:pt-24 md:pb-12 bg-background">
          <div className="absolute inset-0">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <span>Student</span>
              <span className="text-muted-foreground/50">•</span>
              <span>Leader</span>
              <span className="text-muted-foreground/50">•</span>
              <span>Innovator</span>
            </div>
            <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-indigo-500 to-secondary bg-clip-text text-transparent sm:text-7xl md:text-8xl interactive-text-hover text-glint-hover pb-2">
              {typedTitle}
              {isCursorInDOM && <span className={`typewriter-cursor ${cursorAnimationClass} text-foreground`}>|</span>}
            </h1>
            <p className="mt-6 max-w-2xl font-[var(--font-lora)] text-lg sm:text-xl text-muted-foreground interactive-text-hover leading-relaxed">
              Aspiring Biomedical Engineer and Entrepreneur | Rouse High School | Class of 2030
            </p>
            <div className="mt-10 flex flex-row gap-4 items-center justify-center">
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
            <div className="mt-12 flex flex-col items-center">
              <p className="text-lg text-muted-foreground animate-subtle-blink">Scroll down to explore</p>
              <ChevronDown className="h-10 w-10 text-muted-foreground mt-1 animate-bobbing" />
            </div>
          </div>
        </section>

        {/* About Me Details Section */}
        <section className="py-12 md:py-16 bg-primary/5 dark:bg-primary/5 border-y border-border">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-10 interactive-text-hover">About Me</h2>
            <section className="mb-10">
              <h3 className="mb-3 text-xl font-semibold text-primary interactive-text-hover">
                Who I Am
              </h3>
              <div className="prose prose-xl max-w-none text-foreground/90 dark:prose-invert">
                <p>{currentBio}</p>
              </div>
            </section>

            <section>
              <h3 className="mb-6 text-xl font-semibold text-primary interactive-text-hover">
                Areas of Interest
              </h3>
              <div className="grid gap-8 md:grid-cols-3">
                {areasOfInterest.map((interest, index) => (
                  <div key={index} className="group flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:scale-105">
                    <interest.icon className="h-12 w-12 mb-4 text-primary transition-colors duration-300 group-hover:text-secondary" />
                    <h4 className="mb-1 text-lg font-medium text-foreground interactive-text-hover">{interest.title}</h4>
                    <p className="text-sm text-muted-foreground">{interest.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section id="achievements" className="py-12 md:py-16 bg-background">
          <AchievementsSection />
        </section>

        <section id="projects" className="py-12 md:py-16 bg-primary/5 dark:bg-primary/5">
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
