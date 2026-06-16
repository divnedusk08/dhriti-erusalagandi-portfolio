import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserCircle2 } from "lucide-react";

export default function AboutMePage() {
  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
      <section className="mb-12">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="bg-muted/30 p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                  Dhriti Erusalagandi
                </h1>
                <p className="mt-1 text-lg text-muted-foreground md:text-xl">
                  Student, Leader, Innovator
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-primary flex items-center">
              <UserCircle2 className="mr-3 h-7 w-7" />
              About Me
            </h2>
            <div className="prose prose-lg max-w-none text-foreground/90">
              <p>
                I&apos;m a freshman at Rouse High School with a strong interest in biomedical engineering, innovation, and problem-solving. I enjoy exploring how science and technology can be used to improve lives and create meaningful solutions to real-world challenges.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
