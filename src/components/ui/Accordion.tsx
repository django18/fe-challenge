"use client";

import { ReactNode } from "react";
import { DownArrowIcon } from "@/assets/icons";

interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}

export const Accordion = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  className = "",
}: AccordionProps) => {
  return (
    <div
      className={`rounded-lg bg-[#EDF3FF] shadow-sm border border-[#F0F0F0] ${className}`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 p-4"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">{icon}</div>
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <DownArrowIcon
          width={20}
          height={20}
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && <div className="bg-white">{children}</div>}
    </div>
  );
};
