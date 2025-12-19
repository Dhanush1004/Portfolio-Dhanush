"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useMemo, useState, useCallback, useEffect, useRef, createContext, useContext } from "react"
import { Volume2, VolumeX } from "lucide-react"

/* =====================================================
   Environment detection (PERF CRITICAL)
===================================================== */

const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* =====================================================
   AUDIO CONTEXT
===================================================== */

interface AudioContextType {
  isMuted: boolean
  toggleMute: () => void
  playClick: () => void
}

const SplitFlapAudioContext = createContext<AudioContextType | null>(null)

function useSplitFlapAudio() {
  return useContext(SplitFlapAudioContext)
}

export function SplitFlapAudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined" || isMobile || prefersReducedMotion) return null
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContextClass) audioContextRef.current = new AudioContextClass()
    }
    return audioContextRef.current
  }, [])

  const playClick = useCallback(() => {
    if (isMuted || isMobile || prefersReducedMotion) return

    try {
      const ctx = getAudioContext()
      if (!ctx) return

      if (ctx.state === "suspended") ctx.resume()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "square"
      osc.frequency.setValueAtTime(600, ctx.currentTime)
      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.02)
    } catch {}
  }, [isMuted, getAudioContext])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const value = useMemo(() => ({ isMuted, toggleMute, playClick }), [isMuted, toggleMute, playClick])

  return <SplitFlapAudioContext.Provider value={value}>{children}</SplitFlapAudioContext.Provider>
}

/* =====================================================
   MUTE TOGGLE
===================================================== */

export function SplitFlapMuteToggle({ className = "" }: { className?: string }) {
  const audio = useSplitFlapAudio()
  if (!audio || isMobile || prefersReducedMotion) return null

  return (
    <button
      onClick={audio.toggleMute}
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors ${className}`}
    >
      {audio.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      <span>{audio.isMuted ? "Sound Off" : "Sound On"}</span>
    </button>
  )
}

/* =====================================================
   SPLIT FLAP TEXT
===================================================== */

interface SplitFlapTextProps {
  text: string
  className?: string
  speed?: number
}

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")

export function SplitFlapText({ text, className = "", speed = 80 }: SplitFlapTextProps) {
  const chars = useMemo(() => text.split(""), [text])
  const [animationKey, setAnimationKey] = useState(0)
  const lastTriggerRef = useRef(0)
  const audio = useSplitFlapAudio()

  const handleMouseEnter = useCallback(() => {
    if (isMobile || prefersReducedMotion) return
    const now = Date.now()
    if (now - lastTriggerRef.current < 1200) return
    lastTriggerRef.current = now
    setAnimationKey((k) => k + 1)
  }, [])

  return (
    <div
      className={`inline-flex gap-[0.08em] items-center cursor-pointer ${className}`}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      style={{ perspective: "1000px" }}
    >
      {chars.map((char, index) => (
        <SplitFlapChar
          key={index}
          char={char.toUpperCase()}
          index={index}
          animationKey={animationKey}
          speed={speed}
          playClick={audio?.playClick}
        />
      ))}
    </div>
  )
}

/* =====================================================
   SPLIT FLAP CHAR
===================================================== */

interface SplitFlapCharProps {
  char: string
  index: number
  animationKey: number
  speed: number
  playClick?: () => void
}

function SplitFlapChar({ char, index, animationKey, speed, playClick }: SplitFlapCharProps) {
  const isSpace = char === " "
  const displayChar = CHARSET.includes(char) ? char : " "
  const [currentChar, setCurrentChar] = useState(displayChar)
  const [settled, setSettled] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const tileDelay = (isMobile ? 0.05 : 0.12) * index
  const baseFlips = isMobile ? 3 : 5

  useEffect(() => {
  if (isSpace || prefersReducedMotion) return

  if (intervalRef.current) clearInterval(intervalRef.current)
  setSettled(false)

  let flip = 0

  const startDelay = index * (speed * (baseFlips + 1))

  const timeout = setTimeout(() => {
    intervalRef.current = setInterval(() => {
      if (flip >= baseFlips) {
        setCurrentChar(displayChar)
        setSettled(true)
        if (playClick) playClick()
        clearInterval(intervalRef.current!)
        return
      }

      setCurrentChar(CHARSET[Math.floor(Math.random() * CHARSET.length)])
      flip++
    }, speed)
  }, startDelay)

  return () => {
    clearTimeout(timeout)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }
}, [animationKey])


  if (isSpace) {
    return <div style={{ width: "0.3em", fontSize: "clamp(4rem,15vw,14rem)" }} />
  }

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: tileDelay, duration: 0.5 }}
      className="flex items-center justify-center font-[family-name:var(--font-bebas)]"
      style={{
        fontSize: "clamp(4rem,15vw,14rem)",
        width: "0.65em",
        height: "1.05em",
        backgroundColor: settled ? "#000" : "rgba(249,115,22,0.15)",
      }}
    >
      <span style={{ color: settled ? "#fff" : "#f97316" }}>{currentChar}</span>
    </motion.div>
  )
}
