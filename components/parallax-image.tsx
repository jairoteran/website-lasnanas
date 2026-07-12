"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

type ParallaxImageProps = {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  objectPosition?: string
  /** How far (in %) the image drifts across the scroll range. */
  strength?: number
}

export function ParallaxImage({
  src,
  alt,
  sizes,
  priority,
  className,
  objectPosition = "center",
  strength = 12,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Oversized so the vertical drift never exposes empty edges. */}
      <motion.div style={{ y }} className="absolute -inset-y-[16%] inset-x-0">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </motion.div>
    </div>
  )
}
