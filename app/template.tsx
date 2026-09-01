'use client';

import { motion } from 'motion/react';

// Wraps every route's content. Next.js remounts this on each navigation,
// producing a "fade-to-black" projector-shutter transition.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
