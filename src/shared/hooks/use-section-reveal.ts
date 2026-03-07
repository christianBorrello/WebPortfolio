"use client";

import { useEffect, useRef } from "react";

const OBSERVER_THRESHOLD = 0.15;

export function useSectionReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      element.classList.add("reveal-visible");
      return;
    }

    element.classList.add("reveal-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove("reveal-hidden");
          element.classList.add("reveal-visible");
          observer.unobserve(element);
        }
      },
      { threshold: OBSERVER_THRESHOLD }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}
