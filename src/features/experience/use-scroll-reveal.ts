"use client";

import { useCallback, useEffect, useRef } from "react";

type UseScrollRevealResult = {
  readonly containerRef: (element: HTMLOListElement | null) => void;
};

export function useScrollReveal(count: number): UseScrollRevealResult {
  const containerElRef = useRef<HTMLOListElement | null>(null);

  const containerRef = useCallback((element: HTMLOListElement | null) => {
    containerElRef.current = element;
  }, []);

  useEffect(() => {
    const container = containerElRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const children = container.querySelectorAll<HTMLLIElement>(":scope > li");

    if (prefersReducedMotion) {
      for (const child of children) {
        child.dataset.visible = "true";
        child.style.opacity = "1";
        child.style.transform = "translateY(0)";
      }
      return;
    }

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.dataset.revealIndex = String(i);
      child.dataset.visible = "false";
      child.style.opacity = "0";
      child.style.transform = "translateY(20px)";
      child.style.transition = `opacity 0.6s ease-out ${i * 100}ms, transform 0.6s ease-out ${i * 100}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const ioEntry of entries) {
          if (ioEntry.isIntersecting) {
            const target = ioEntry.target as HTMLLIElement;
            target.dataset.visible = "true";
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
            observer.unobserve(target);
          }
        }
      },
      { threshold: 0.1 }
    );

    for (const child of children) {
      observer.observe(child);
    }

    return () => {
      observer.disconnect();
    };
  }, [count]);

  return { containerRef };
}
