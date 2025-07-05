"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { DownArrowIcon } from "@/assets/icons";

interface AccordionProps {
  title: string;
  icon: string;
  iconAlt: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}

export const Accordion = ({
  title,
  icon,
  iconAlt,
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
          <Image src={icon} alt={iconAlt} width={20} height={20} />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <Image
          src={DownArrowIcon}
          alt="Down arrow"
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
