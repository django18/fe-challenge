"use client";

import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// Aspire Logo Icon
export const AspireLogoIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

// Home Icon
export const HomeIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

// Card Icon
export const CardIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

// Payments Icon
export const PaymentsIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

// Credit Icon
export const CreditIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Account Icon
export const AccountIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Freeze Card Icon
export const FreezeCardIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M10 2v20M14 2v20M4 7l16 10M4 17l16-10" />
  </svg>
);

// Set Spend Limit Icon
export const SetSpendLimitIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16,8 20,8 18,4" />
    <polygon points="16,16 20,16 18,20" />
  </svg>
);

// GPay Icon
export const GPayIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

// Replace Card Icon
export const ReplaceCardIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

// Deactivate Card Icon
export const DeactivateCardIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);
