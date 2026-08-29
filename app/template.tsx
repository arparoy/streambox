'use client';

import { motion } from 'motion/react';

// Wraps every route's content. Next.js remounts this on each navigation,
// so the entrance animation replays for a smooth, premium page transition.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
