
"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Github, Info, Lightbulb, Settings2, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl?: string;
  imageHint?: string;
  purpose: string;
  functionality: string[];
  techStack: string[];
  liveLink?: string;
  repoLink?: string;
  codeContent?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);

  const isCanvaLink = project.liveLink?.includes("canva.com");

  return (
    <Card className="group flex h-full flex-col overflow-hidden shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 hover:border-accent bg-card/80 backdrop-blur-sm">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {project.imageUrl && (
          <CardHeader className="relative p-0">
            <DialogTrigger asChild>
              <button className="block aspect-[16/10] w-full cursor-pointer overflow-hidden" aria-label={`View details for ${project.title}`}>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={375}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={project.imageHint || 'project image'}
                />
              </button>
            </DialogTrigger>
          </CardHeader>
        )}
        <DialogContent className="max-w-3xl p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-3xl font-bold text-primary">{project.title}</DialogTitle>
            <DialogDescription className="text-md text-muted-foreground">{project.shortDescription}</DialogDescription>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto px-6 pb-6">
            {project.imageUrl && (
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={800}
                height={500}
                className="mb-6 w-full rounded-lg object-cover shadow-md"
                data-ai-hint={project.imageHint || 'project image'}
              />
            )}
            <section className="mb-6">
              <h3 className="mb-2 flex items-center text-xl font-semibold text-primary">
                <Info className="mr-2 h-5 w-5" />
                Project Overview
              </h3>
              <p className="text-foreground/90">{project.longDescription}</p>
            </section>
            <section className="mb-6">
              <h3 className="mb-2 flex items-center text-xl font-semibold text-primary">
                <Lightbulb className="mr-2 h-5 w-5" />
                Purpose
              </h3>
              <p className="text-foreground/90">{project.purpose}</p>
            </section>
            <section className="mb-6">
              <h3 className="mb-2 flex items-center text-xl font-semibold text-primary">
                <Settings2 className="mr-2 h-5 w-5" />
                Key Functionality
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-foreground/90">
                {project.functionality.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="mb-6">
              <h3 className="mb-2 text-xl font-semibold text-primary">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">{tech}</Badge>
                ))}
              </div>
            </section>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveLink && (
                <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> 
                    {isCanvaLink ? "View on Canva" : "View Live"}
                  </a>
                </Button>
              )}
              {project.codeContent && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsCodeDialogOpen(true)}
                >
                  <Code className="mr-2 h-4 w-4" /> View Code
                </Button>
              )}
              {project.repoLink && (
                <Button asChild variant="outline">
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Repo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">{project.title} - Code</DialogTitle>
            <DialogDescription>Source code preview</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{project.codeContent}</code>
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      <CardContent className={`flex-grow p-5 ${!project.imageUrl ? 'pt-5' : ''}`}>
        <CardTitle className="mb-2 text-xl font-semibold text-primary group-hover:text-accent">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {project.shortDescription}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button variant="outline" className="w-full" onClick={() => setIsDialogOpen(true)}>
          <Info className="mr-2 h-4 w-4" /> View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
