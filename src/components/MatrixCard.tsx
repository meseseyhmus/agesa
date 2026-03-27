import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MatrixCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'green' | 'red' | 'blue';
  animate?: boolean;
}

export function MatrixCard({ 
  children, 
  className = '', 
  glowColor = 'green',
  animate = true 
}: MatrixCardProps) {
  const glowColors = {
    green: 'shadow-[0_0_30px_rgba(0,255,65,0.3)] border-[#00FF41]',
    red: 'shadow-[0_0_30px_rgba(255,0,0,0.3)] border-[#FF0000]',
    blue: 'shadow-[0_0_30px_rgba(0,102,255,0.3)] border-[#0066FF]',
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.95 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.5 }}
      className={`
        relative bg-[#001400]/90 backdrop-blur-sm
        border ${glowColors[glowColor]}
        ${className}
      `}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current opacity-50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current opacity-50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current opacity-50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current opacity-50" />
      
      {children}
    </motion.div>
  );
}
