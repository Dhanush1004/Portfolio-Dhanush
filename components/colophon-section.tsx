"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
  04 / Contact
</span>
<h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
  GET IN TOUCH
</h2>

      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
  {/* About */}
  <div className="col-span-1">
    <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
      About
    </h4>
    <ul className="space-y-2">
      <li className="font-mono text-xs text-foreground/80">Dhanush</li>
      <li className="font-mono text-xs text-foreground/80">Final Year Engineering Student</li>
    </ul>
  </div>

  {/* Tech Stack */}
  <div className="col-span-1">
    <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
      Tech Stack
    </h4>
    <ul className="space-y-2">
      <li className="font-mono text-xs text-foreground/80">React / Next.js</li>
      <li className="font-mono text-xs text-foreground/80">GSAP / Tailwind CSS</li>
      <li className="font-mono text-xs text-foreground/80">Node.js / MongoDB</li>
    </ul>
  </div>

  {/* Tools */}
  <div className="col-span-1">
    <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
      Tools
    </h4>
    <ul className="space-y-2">
      <li className="font-mono text-xs text-foreground/80">Git & GitHub</li>
      <li className="font-mono text-xs text-foreground/80">VS Code</li>
      <li className="font-mono text-xs text-foreground/80">Postman</li>
    </ul>
  </div>

  {/* Location */}
  <div className="col-span-1">
    <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
      Location
    </h4>
    <ul className="space-y-2">
      <li className="font-mono text-xs text-foreground/80">Chennai, India</li>
      <li className="font-mono text-xs text-foreground/80">Open to Remote</li>
    </ul>
  </div>

  {/* Contact */}
  <div className="col-span-1">
    <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
      Contact
    </h4>
    <ul className="space-y-2">
      <li>
        <a
          href="mailto:dhanushanbalagan2004@gmail.com"
          className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
        >
          Email
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/dhanush-a-5757abc/"
          target="_blank"
          className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
        >
          LinkedIn
        </a>
      </li>
    </ul>
  </div>

  {/* Profiles */}
  <div className="col-span-1">
    <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
      Profiles
    </h4>
    <ul className="space-y-2">
      <li>
        <a
          href="https://github.com/Dhanush1004"
          target="_blank"
          className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
        >
          GitHub
        </a>
      </li>
      <li className="font-mono text-xs text-foreground/80"><a
          href="https://leetcode.com/u/dhanushanbu/"
          target="_blank"
          className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
        >LeetCode
        </a>
        </li>
    </ul>
  </div>
</div>


      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
  © 2025 Dhanush. All rights reserved.
</p>
<p className="font-mono text-[10px] text-muted-foreground">
  Designed & built by Dhanush.
</p>

      </div>
    </section>
  )
}
