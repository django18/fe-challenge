"use client";

import React from "react";
import { cn } from "@/utils/cn";
import {
  FreezeCardIcon,
  SetSpendLimitIcon,
  GPayIcon,
  ReplaceCardIcon,
  DeactivateCardIcon,
} from "@/assets/icons";

// ---- Registry ----
export const iconRegistry = {
  freezeCard: FreezeCardIcon,
  setSpendLimit: SetSpendLimitIcon,
  gPay: GPayIcon,
  replaceCard: ReplaceCardIcon,
  deactivateCard: DeactivateCardIcon,
  // future icons can be added here
} as const;

export type IconName = keyof typeof iconRegistry;

// ---- Main Icon component ----
interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Name of the icon as defined in iconRegistry */
  name: IconName;
  /** Pixel size for width & height (defaults to 24) */
  size?: number;
  /** Tailwind / custom className */
  className?: string;
}

export const Icon = ({ name, size = 24, className, ...rest }: IconProps) => {
  const Svg = iconRegistry[name];
  if (!Svg) {
    console.warn(`Icon “${name}” not found in registry.`);
    return null;
  }
  return (
    <Svg
      width={size}
      height={size}
      className={cn("inline-block", className)}
      {...rest}
    />
  );
};
