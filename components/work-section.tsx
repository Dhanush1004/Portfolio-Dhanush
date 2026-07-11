"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Github } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiments = [
  {
    title: "StockMind AI",
    medium: "AI • Full Stack • 2025",
    description:
      "AI-powered stock analysis and paper trading platform built with FastAPI, React.js, and MySQL. Combines FinBERT sentiment analysis with technical indicators (RSI, MACD, EMA) to deliver intelligent trading recommendations through a real-time analytics dashboard.",
    span: "col-span-1 row-span-1",
    githubUrl: "https://github.com/Dhanush1004",
    tags: ["FastAPI", "React", "MySQL"],
  },
  {
    title: "Food Allergy Detection AI",
    medium: "AI • OCR • NLP • 2025",
    description:
      "AI-driven allergy detection platform that extracts ingredients from food labels using OCR and NLP. Features FastAPI microservices, MongoDB, JWT authentication, and personalized allergy prediction.",
    span: "col-span-1 row-span-1",
    githubUrl: "https://github.com/Dhanush1004/Project-AllergyAlert",
    tags: ["OCR", "NLP", "MongoDB"],
  },
  {
    title: "AI Diabetes Risk Prediction",
    medium: "Machine Learning • 2025",
    description:
      "Healthcare prediction system using Scikit-learn, FastAPI, and Docker. Trained multiple ML models with GridSearchCV and deployed a REST API for real-time diabetes risk prediction.",
    span: "col-span-1 row-span-1",
    githubUrl: "https://github.com/Dhanush1004/AI-Powered-Diabetes-Risk-Prediction",
    tags: ["ML", "FastAPI", "Docker"],
  },
  {
    title: "Mental Health Chatbot",
    medium: "NLP • AI • 2024",
    description:
      "Context-aware chatbot developed with Python, NLP, and Scikit-learn. Optimized intent classification, reduced inference latency, and implemented modular architecture for scalable conversational support.",
    span: "col-span-1 row-span-1",
    githubUrl: "https://github.com/Dhanush1004/Mental-Health-care",
    tags: ["Python", "NLP", "Scikit-learn"],
  },
  {
    title: "Eye Disease Classification",
    medium: "Deep Learning",
    description:
      "CNN-based retinal disease classification system with image preprocessing, model training, evaluation, and prediction interface for automated eye disease detection.",
    span: "col-span-1 row-span-1",
    githubUrl: "https://github.com/Dhanush1004/Eye-Disease-Classification",
    tags: ["CNN", "PyTorch", "Computer Vision"],
  },
  {
    title: "Bulk Email Sender",
    medium: "Full Stack",
    description:
      "Bulk email automation platform supporting Excel uploads, SMTP integration, email templates, delivery tracking, and campaign management.",
    span: "col-span-1 row-span-1",
    githubUrl: "https://github.com/Dhanush1004/Basic-Bulk-Email-Sender",
    tags: ["Node.js", "SMTP", "Automation"],
  },
  
]


export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative pt-16 pb-24 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-8 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            02 / Projects
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            PROJECT WORKS
          </h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          A collection of AI, full-stack, and machine learning projects focused on
          innovation, performance, and real-world impact.
        </p>
      </div>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
      >
        {experiments.map((experiment, index) => (
          <WorkCard key={index} experiment={experiment} index={index} persistHover={index === 0} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({
  experiment,
  index,
  persistHover = false,
}: {
  experiment: {
    title: string
    medium: string
    description: string
    span: string
    githubUrl?: string
    tags: string[]
  }
  index: number
  persistHover?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden border border-border/40 bg-background/70 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/[0.04] cursor-pointer",
        experiment.span,
        isActive && "border-accent/60 bg-accent/[0.06]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {experiment.medium}
            </span>
            <h3
              className={cn(
                "mt-2 font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight transition-colors duration-300",
                isActive ? "text-accent" : "text-foreground",
              )}
            >
              {experiment.title}
            </h3>
          </div>
          <span
            className={cn(
              "font-mono text-[10px] transition-colors duration-300",
              isActive ? "text-accent" : "text-muted-foreground/40",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {experiment.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/50 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <p
          className={cn(
            "max-w-[260px] font-mono text-[11px] leading-relaxed text-muted-foreground transition-all duration-500",
            isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          {experiment.description}
        </p>
      </div>

      <div className="relative z-10 mt-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          Selected case
        </span>
        {experiment.githubUrl ? (
          <a
            href={experiment.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-2.5 py-1 text-[10px] font-medium text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
            onClick={(event) => event.stopPropagation()}
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>

      <div
        className={cn(
          "absolute top-0 right-0 h-12 w-12 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute right-0 top-0 h-[1px] w-full bg-accent" />
        <div className="absolute right-0 top-0 h-full w-[1px] bg-accent" />
      </div>
    </article>
  )
}
