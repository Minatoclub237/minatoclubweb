import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface BlurTextProps {
  text: string;
  delay?: number; // Base delay in ms
  stagger?: number; // Stagger per element in ms (default 200ms)
  splitBy?: "words" | "letters";
  className?: string;
  direction?: "bottom" | "top";
  as?: React.ElementType; // balise du conteneur (ex. "h1" pour le SEO)
}

export function BlurText({
  text,
  delay = 100,
  stagger = 150,
  splitBy = "words",
  className = "",
  direction = "bottom",
  as: Tag = "div",
}: BlurTextProps) {
  const Container = Tag as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  // Trigger once when 10% of the text is in view
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const elements = splitBy === "words" ? text.split(" ") : text.split("");

  const startY = direction === "bottom" ? 50 : -50;

  return (
    <Container ref={ref as React.Ref<HTMLElement>} className={`inline-flex flex-wrap ${className}`} id="blur-text-container">
      {elements.map((el, index) => {
        // Calculate delay for this specific element
        const elementDelay = (delay + index * stagger) / 1000;

        return (
          <motion.span
            key={index}
            className="inline-block"
            style={{
              whiteSpace: "pre-wrap",
              marginRight: splitBy === "words" ? "0.25em" : "0px",
            }}
            initial={{
              filter: "blur(10px)",
              opacity: 0,
              y: startY,
            }}
            animate={
              isInView
                ? {
                    filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                    opacity: [0, 0.5, 1],
                    y: [startY, -5, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.35,
              delay: elementDelay,
              times: [0, 0.5, 1],
              ease: "easeOut",
            }}
          >
            {el === " " ? "\u00A0" : el}
          </motion.span>
        );
      })}
    </Container>
  );
}
