"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

const directionMap = {
  up:    { y: 40,  x: 0   },
  down:  { y: -40, x: 0   },
  left:  { y: 0,   x: 40  },
  right: { y: 0,   x: -40 },
};

export default function ScrollReveal({ children, direction = "up", delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
