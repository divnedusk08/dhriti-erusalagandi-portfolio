
"use client";

import { useState, useEffect } from "react";
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

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentBio] = useState<string>(
    "I'm a freshman at Rouse High School with a strong interest in biomedical engineering, innovation, and problem-solving. I enjoy exploring how science and technology can be used to improve lives and create meaningful solutions to real-world challenges. Through academics, leadership, volunteer work, and personal projects, I continuously seek opportunities to learn, grow, and make a positive impact. Outside of school, I enjoy coding and building things, which let me combine creativity with critical thinking and bring ideas to life."
  );

  const fullTitle = "Hi, I'm Dhriti";
  const [typedTitle, setTypedTitle] = useState("");
  const [isCursorInDOM, setIsCursorInDOM] = useState(true);
  const [cursorAnimationClass, setCursorAnimationClass] = useState('animate-blink');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const [whoIAmRef, isWhoIAmVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [interestsRef, isInterestsVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (isLoading) return;

    let typingTimeoutId: NodeJS.Timeout;

    if (typedTitle.length < fullTitle.length) {
      setCursorAnimationClass('animate-blink');
      setIsCursorInDOM(true);

      const baseDelay = 65;
      const randomDelay = Math.random() * 30;
      const nextCharDelay = typedTitle.length === 2 ? 220 : baseDelay + randomDelay;

      typingTimeoutId = setTimeout(() => {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
      }, nextCharDelay);
    } else {
      // Sequence when typing finishes
      setIsTypingComplete(true);

      // Fade out cursor gracefully
      typingTimeoutId = setTimeout(() => {
        setCursorAnimationClass('animate-fade-out');
        setTimeout(() => setIsCursorInDOM(false), 400);
      }, 900);
    }

    return () => clearTimeout(typingTimeoutId);
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
        <section
          id="about"
          className="relative overflow-hidden flex min-h-[calc(100vh-4rem)] flex-col justify-center px-6 pt-16 pb-12 md:px-10"
        >
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-[2000ms] ease-in-out",
              typedTitle.length > 0 ? "opacity-100" : "opacity-0"
            )}
          >
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <p
              className={cn(
                "eyebrow mb-6 transition-all duration-700",
                typedTitle.length > 0 ? "opacity-100" : "opacity-0"
              )}
            >
              Portfolio
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {typedTitle}
              {isCursorInDOM && (
                <span
                  className={`typewriter-cursor ${cursorAnimationClass} text-primary inline-block align-baseline`}
                >
                  |
                </span>
              )}
            </h1>
            <p
              className={cn(
                "mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                isTypingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              Aspiring biomedical engineer and entrepreneur. Rouse High School,
              Class of 2030.
            </p>
            <div
              className={cn(
                "mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 transition-all duration-1000 delay-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                isTypingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              <a
                href="https://canva.link/33nqckkbyiwxj2v"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View Resume
              </a>
              <a
                href="#contact"
                className="link-underline text-sm font-medium text-foreground"
              >
                Get in touch &rarr;
              </a>
            </div>
          </div>

          <div
            className={cn(
              "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-700",
              isTypingComplete ? "opacity-60" : "opacity-0"
            )}
          >
            <span className="text-xs tracking-widest uppercase text-muted-foreground">Scroll to explore</span>
            <ChevronDown className="h-5 w-5 text-muted-foreground animate-bobbing" />
          </div>
        </section>

        {/* About Me Details Section */}
        <section className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6 md:px-10">
            <p className="eyebrow mb-12">About</p>

            <div
              ref={whoIAmRef}
              className={cn("mb-20 fade-in-up", { "is-visible": isWhoIAmVisible })}
            >
              <h3 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">Who I am</h3>
              <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {currentBio}
              </p>
            </div>

            <div
              ref={interestsRef}
              className={cn("stagger-fade-in-container", { "is-visible": isInterestsVisible })}
            >
              <h3 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">Focus areas</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {areasOfInterest.map((interest, index) => (
                  <div
                    key={index}
                    className="stagger-item group flex flex-col rounded-xl border border-border bg-background p-8 transition-colors hover:border-foreground/30"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <interest.icon className="mb-6 h-10 w-10 text-primary" strokeWidth={1.5} />
                    <h4 className="mb-3 text-xl font-semibold text-foreground">{interest.title}</h4>
                    <p className="text-base leading-relaxed text-muted-foreground">{interest.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="achievements" className="border-t border-border py-20 md:py-28">
          <AchievementsSection />
        </section>

        <section id="volunteer" className="border-t border-border py-20 md:py-28">
          <VolunteerSection />
        </section>

        <section id="projects" className="border-t border-border py-20 md:py-28">
          <ProjectsSection />
        </section>

        <section id="contact" className="border-t border-border py-20 md:py-28">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
