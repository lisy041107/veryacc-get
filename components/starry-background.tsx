"use client"

import { useEffect, useState, useCallback } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  animationDelay: string
  animationDuration: string
}

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    const generated: Star[] = []
    for (let i = 0; i < 150; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      })
    }
    setStars(generated)
  }, [])

  const spawnShootingStar = useCallback(() => {
    const newStar: ShootingStar = {
      id: Date.now() + Math.random(),
      x: Math.random() * 70,
      y: Math.random() * 40,
      angle: Math.random() * 20 + 25,
    }
    setShootingStars((prev) => [...prev, newStar])
    setTimeout(() => {
      setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id))
    }, 1500)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        spawnShootingStar()
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [spawnShootingStar])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-foreground animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-shooting-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: `rotate(${star.angle}deg)`,
          }}
        >
          <div className="w-[2px] h-[80px] bg-gradient-to-b from-foreground/80 via-foreground/30 to-transparent" />
        </div>
      ))}
    </div>
  )
}
