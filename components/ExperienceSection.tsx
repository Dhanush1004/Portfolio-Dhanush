"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  const experiences = [
    {
      number: "01",
      titleParts: [
        { text: "APP ", highlight: true },
        { text: "DEVELOPMENT INTERNSHIP", highlight: false },
      ],
      description:
        "Completed an internship in app development, working on frontend components, API integration, and real-world application features.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "FULL STACK ", highlight: true },
        { text: "TRAINING", highlight: false },
      ],
      description:
        "Hands-on learning in MERN stack development, building complete applications with authentication, database integration, and deployment basics.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "TECHNICAL ", highlight: false },
        { text: "CERTIFICATIONS", highlight: true },
      ],
      description:
        "Completed certifications in Java, Python, SQL, and Web Development to strengthen core programming and software engineering skills.",
      align: "left",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !itemsRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      })

      // Item animations
      const articles = itemsRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = experiences[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          04 / Experience
        </span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          EXPERIENCE & CERTIFICATIONS
        </h2>
      </div>

      {/* Experience items */}
      <div ref={itemsRef} className="space-y-24 md:space-y-32">
        {experiences.map((item, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              item.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            {/* Label */}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {item.number}
            </span>

            <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none">
              {item.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h3>

            <p className="mt-6 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>

            <div
              className={`mt-8 h-[1px] bg-border w-24 md:w-48 ${
                item.align === "right" ? "mr-0" : "ml-0"
              }`}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
