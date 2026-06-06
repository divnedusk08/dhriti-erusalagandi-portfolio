
"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, UserCircle2, Code, Brain, Palette, Lightbulb } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { cn } from "@/lib/utils";

// Import section components
import AchievementsSection from "@/app/(main)/achievements/page";
import ProjectsSection from "@/app/(main)/projects/page";
import ContactSection from "@/app/(main)/contact/page";


import { FloatingPaths } from "@/components/ui/background-paths";


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true); // Preloader state
  const [currentBio, setCurrentBio] = useState<string>(
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
      setCursorAnimationClass('animate-blink'); // Ensure cursor is blinking while typing
      setIsCursorInDOM(true);
      typingTimeoutId = setTimeout(() => {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
      }, 100);
    } else {
      // Typing finished
      setCursorAnimationClass('animate-blink'); // Keep blinking for a short duration
      cursorBlinkTimeoutId = setTimeout(() => {
        setCursorAnimationClass('animate-fade-out'); // Start fading out
        cursorFadeTimeoutId = setTimeout(() => {
          setIsCursorInDOM(false); // Remove cursor from DOM after fade
        }, 300); // Duration of fade-out animation
      }, 500); // How long to keep blinking after typing finishes
    }

    return () => {
      clearTimeout(typingTimeoutId);
      clearTimeout(cursorBlinkTimeoutId);
      clearTimeout(cursorFadeTimeoutId);
    };
  }, [typedTitle, fullTitle, isLoading]);

  useEffect(() => {
    const heroElement = heroSectionRef.current;
    if (!heroElement || isLoading) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      heroElement.style.setProperty('--mouse-x', `${x}px`);
      heroElement.style.setProperty('--mouse-y', `${y}px`);
    };

    heroElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      heroElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoading]);


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
            <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl interactive-text-hover text-glint-hover">
              {typedTitle}
              {isCursorInDOM && <span className={`typewriter-cursor ${cursorAnimationClass}`}>|</span>}
            </h1>
            <p className="mt-8 max-w-3xl font-[var(--font-lora)] text-2xl text-foreground/90 interactive-text-hover">
              A passionate young entrepreneur and innovative thinker, turning bold ideas into impactful projects through creativity, leadership, and purpose.
            </p>
            <div className="mt-12 flex flex-col items-center">
              <p className="text-lg text-muted-foreground animate-subtle-blink">Scroll down to explore</p>
              <ChevronDown className="h-10 w-10 text-muted-foreground mt-1 animate-bobbing" />
            </div>
          </div>
        </section>

        {/* About Me Details Section */}
        <section className="py-12 md:py-16 bg-primary/10 dark:bg-primary/5">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="text-center text-3xl font-bold text-primary mb-10 interactive-text-hover">About Me</h2>
                <section className="mb-10">
                    <h3 className="mb-3 text-xl font-semibold text-accent interactive-text-hover">
                      Who I Am
                    </h3>
                    <div className="prose prose-xl max-w-none text-foreground/90 dark:prose-invert">
                      <p>{currentBio}</p>
                    </div>
                </section>

                <section>
                    <h3 className="mb-6 text-xl font-semibold text-accent interactive-text-hover">
                      Areas of Interest
                    </h3>
                    <div className="grid gap-8 md:grid-cols-3">
                      {areasOfInterest.map((interest, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg ">
                          <interest.icon className="h-12 w-12 mb-3 text-accent" />
                          <h4 className="mb-1 text-lg font-medium text-foreground interactive-text-hover">{interest.title}</h4>
                          <p className="text-sm text-muted-foreground">{interest.description}</p>
                        </div>
                      ))}
                    </div>
                </section>
            </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-12 md:py-16 bg-background">
          <AchievementsSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 md:py-16 bg-primary/10 dark:bg-primary/5">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-16 bg-background">
          <ContactSection />
        </section>

      </main>
      <Footer />
    </div>
  );
}
