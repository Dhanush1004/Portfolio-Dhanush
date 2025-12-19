"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import {
  SplitFlapText,
  SplitFlapMuteToggle,
  SplitFlapAudioProvider,
} from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"



gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      // Text content scroll fade
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Image scroll fade (slower, premium feel)
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -60,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12"
    >
      <AnimatedNoise opacity={0.03} />

      {/* Left vertical label */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          PORTFOLIO
        </span>
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* ================= LEFT COLUMN ================= */}
        <div ref={contentRef}>
          <SplitFlapAudioProvider>
            <div className="relative">
              <SplitFlapText text="DHANUSH" speed={80} />
              <div className="mt-4">
                <SplitFlapMuteToggle />
              </div>
            </div>
          </SplitFlapAudioProvider>

          <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1rem,3vw,2rem)] mt-4 tracking-wide">
            Software Developer
          </h2>

          <p className="mt-12 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
            I build modern, interactive web experiences using React, Next.js,
            animations, and clean UI systems. Focused on performance, motion,
            and real-world usability.
          </p>

          <div className="mt-16 flex items-center gap-8">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
            >
              <ScrambleTextOnHover text="View Projects" as="span" duration={0.5} />
<ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (IMAGE) ================= */}
        <div
          ref={imageRef}
          className="relative hidden md:flex justify-end items-center"
        >
          <div className="relative w-[380px] h-[480px] overflow-hidden rounded-2xl ">
            <img
              src="/dhan.png"
              alt="Dhanush portrait"
              className="w-full h-full object-cover transition duration-700"
            />

            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Chennai, India
        </div>
      </div>
    </section>
  )
}
