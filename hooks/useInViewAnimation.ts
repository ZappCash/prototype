import { useInView } from "framer-motion";
import { useRef } from "react";

interface UseInViewAnimationOptions {
  once?: boolean;
  amount?: number | "some" | "all";
}

export function useInViewAnimation(options?: UseInViewAnimationOptions) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.3,
  });

  return { ref, isInView };
}
