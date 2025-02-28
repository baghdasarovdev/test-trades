"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string
}

export default function Card({ title, children,className }: CardProps) {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
