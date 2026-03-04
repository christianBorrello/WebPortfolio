"use client";

import { useCallback, useEffect, useRef } from "react";

const REVEAL_DURATION_S = 0.6;
const REVEAL_STAGGER_MS = 100;
const REVEAL_OFFSET_PX = 20;
const OBSERVER_THRESHOLD = 0.1;

type UseScrollRevealResult = {
  readonly containerRef: (element: HTMLOListElement | null) => void;
};

function revealElement(element: HTMLLIElement): void {
  element.dataset.visible = "true";
  element.style.opacity = "1";
  element.style.transform = "translateY(0)";
}

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
        revealElement(child);
      }
      return;
    }

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const staggerDelay = i * REVEAL_STAGGER_MS;
      child.dataset.revealIndex = String(i);
      child.dataset.visible = "false";
      child.style.opacity = "0";
      child.style.transform = `translateY(${REVEAL_OFFSET_PX}px)`;
      child.style.transition = `opacity ${REVEAL_DURATION_S}s ease-out ${staggerDelay}ms, transform ${REVEAL_DURATION_S}s ease-out ${staggerDelay}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const ioEntry of entries) {
          if (ioEntry.isIntersecting) {
            revealElement(ioEntry.target as HTMLLIElement);
            observer.unobserve(ioEntry.target);
          }
        }
      },
      { threshold: OBSERVER_THRESHOLD }
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
