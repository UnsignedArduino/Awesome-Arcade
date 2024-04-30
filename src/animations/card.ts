import { Variants } from "framer-motion";

export const CARD_VARIANTS: Variants = {
  initial: {
    x: 300,
    opacity: 0,
  },
  animate: (i: any) => {
    return {
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    };
  },
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.99 },
};
