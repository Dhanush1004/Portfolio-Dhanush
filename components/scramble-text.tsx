"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import gsap from "gsap"

interface ScrambleTextProps {
  text: string
  className?: string
  /** Delay in milliseconds before animation starts */
  delayMs?: number
  /** Duration of the scramble animation in seconds */
  duration?: number
}

interface ScrambleTextOnHoverProps {
  text: string
  className?: string
  /** Duration of the scramble animation in seconds */
  duration?: number
  /** Element type to render */
  as?: "span" | "button" | "div"
  /** onClick handler for buttons */
  onClick?: () => void
}

const GLYPHS = "!@#$%^&*()_+-=<>?/\\[]{}Xx"

/**
 * Run the scramble animation on text
 */
function runScrambleAnimation(
  text: string,
  duration: number,
  setDisplayText: (text: string) => void,
  onComplete?: () => void,
): gsap.core.Tween {
  const lockedIndices = new Set<number>()
  const finalChars = text.split("")
  const totalChars = finalChars.length
  const scrambleObj = { progress: 0 }

  return gsap.to(scrambleObj, {
    progress: 1,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const numLocked = Math.floor(scrambleObj.progress * totalChars)

      for (let i = 0; i < numLocked; i++) {
        lockedIndices.add(i)
      }

      const newDisplay = finalChars
        .map((char, i) => {
          if (lockedIndices.has(i)) return char
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join("")

      setDisplayText(newDisplay)
    },
    onComplete: () => {
      setDisplayText(text)
      onComplete?.()
    },
  })
}

/**
 * Scramble text animation component - animates on mount.
 */
export function ScrambleText({ text, className, delayMs = 0, duration = 0.9 }: ScrambleTextProps) {
  // Initialize with text to avoid flash of empty content
  const [displayText, setDisplayText] = useState(text)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Run animation only once on initial mount
  useEffect(() => {
    if (hasAnimated || !text) return

    // Start with scrambled text
    const scrambledStart = text
      .split("")
      .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
      .join("")
    setDisplayText(scrambledStart)

    timeoutRef.current = setTimeout(() => {
      animationRef.current = runScrambleAnimation(text, duration, setDisplayText, () => {
        setHasAnimated(true)
      })
    }, delayMs)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (animationRef.current) animationRef.current.kill()
    }
  }, []) // Empty deps - only run on mount

  // Handle text prop changes after initial animation
  useEffect(() => {
    if (hasAnimated && displayText !== text) {
      setDisplayText(text)
    }
  }, [text, hasAnimated, displayText])

  return (
    <span ref={containerRef} className={className}>
      {displayText || text}
    </span>
  )
}

/**
 * Scramble text animation component - animates on hover.
 */
export function ScrambleTextOnHover({
  text,
  className,
  duration = 0.6,
  as: Component = "span",
  onClick,
}: ScrambleTextOnHoverProps) {
  const [displayText, setDisplayText] = useState(text)
  const isAnimating = useRef(false)
  const startTime = useRef(0)

  const handleMouseEnter = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true
    startTime.current = performance.now()

    const chars = text.split("")
    const total = chars.length

    const update = () => {
      const elapsed = (performance.now() - startTime.current) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const revealCount = Math.floor(progress * total)

      const scrambled = chars.map((char, i) => {
        if (i < revealCount) return char
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      })

      setDisplayText(scrambled.join(""))

      if (progress === 1) {
        setDisplayText(text)
        isAnimating.current = false
        gsap.ticker.remove(update)
      }
    }

    gsap.ticker.add(update)
  }, [text, duration])

  return (
    <Component
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {displayText}
    </Component>
  )
}
