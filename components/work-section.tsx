"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiments = [
  {
    title: "StockMind AI",
    medium: "AI • Full Stack • 2026",
    description:
      "AI-powered stock analysis and paper trading platform built with FastAPI, React.js, and MySQL. Combines FinBERT sentiment analysis with technical indicators (RSI, MACD, EMA) to deliver intelligent trading recommendations through a real-time analytics dashboard.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Food Allergy Detection AI",
    medium: "AI • OCR • NLP • 2025",
    description:
      "AI-driven allergy detection platform that extracts ingredients from food labels using OCR and NLP. Features FastAPI microservices, MongoDB, JWT authentication, and personalized allergy prediction.",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    title: "AI Diabetes Risk Prediction",
    medium: "Machine Learning • 2025",
    description:
      "Healthcare prediction system using Scikit-learn, FastAPI, and Docker. Trained multiple ML models with GridSearchCV and deployed a REST API for real-time diabetes risk prediction.",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Mental Health Chatbot",
    medium: "NLP • AI • 2024",
    description:
      "Context-aware chatbot developed with Python, NLP, and Scikit-learn. Optimized intent classification, reduced inference latency, and implemented modular architecture for scalable conversational support.",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Eye Disease Classification",
    medium: "Deep Learning",
    description:
      "CNN-based retinal disease classification system with image preprocessing, model training, evaluation, and prediction interface for automated eye disease detection.",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Bulk Email Sender",
    medium: "Full Stack",
    description:
      "Bulk email automation platform supporting Excel uploads, SMTP integration, email templates, delivery tracking, and campaign management.",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Hotel Booking System",
    medium: "Web Application",
    description:
      "Full-stack hotel reservation system featuring authentication, room availability tracking, online booking, and administrative management dashboard.",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Portfolio Website",
    medium: "Next.js • GSAP",
    description:
      "Premium developer portfolio built with Next.js, TypeScript, Tailwind CSS, and GSAP, featuring smooth animations, responsive design, and optimized performance.",
    span: "md:col-span-2 md:row-span-1",
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
    <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
  02 / Projects
</span>
<h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
  SELECTED WORK
</h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
  A collection of frontend, full-stack, and learning projects focused on
  performance, usability, and clean design.
</p>
      </div>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]"
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
        "group relative border border-border/40 p-5 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden",
        experiment.span,
        isActive && "border-accent/60",
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

      {/* Content */}
      <div className="relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {experiment.medium}
        </span>
        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight transition-colors duration-300",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {experiment.title}
        </h3>
      </div>

      {/* Description - reveals on hover */}
      <div className="relative z-10">
        <p
          className={cn(
            "font-mono text-xs text-muted-foreground leading-relaxed transition-all duration-500 max-w-[280px]",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {experiment.description}
        </p>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner line */}
      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
