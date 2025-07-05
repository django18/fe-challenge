"use client";

import {
  HomeIconMobile,
  CardIconMobile,
  PaymentsIconMobile,
  CreditIconMobile,
  AccountIconMobile,
} from "@/assets/icons";
import { cn } from "@/utils/cn";

interface MobileNavProps {
  className?: string;
}

export const MobileNav = ({ className }: MobileNavProps) => {
  const navigationItems = [
    {
      icon: HomeIconMobile,
      label: "Home",
      href: "/",
      active: false,
    },
    {
      icon: CardIconMobile,
      label: "Cards",
      href: "/cards",
      active: true,
    },
    {
      icon: PaymentsIconMobile,
      label: "Payments",
      href: "/payments",
      active: false,
    },
    {
      icon: CreditIconMobile,
      label: "Credit",
      href: "/credit",
      active: false,
    },
    {
      icon: AccountIconMobile,
      label: "Profile",
      href: "/profile",
      active: false,
    },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50 pb-2",
        className
      )}
    >
      <nav className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1",
                item.active ? "text-[#01D167]" : "text-gray-500"
              )}
            >
              <IconComponent
                width={24}
                height={24}
                className={cn(
                  "mb-1 transition-colors",
                  item.active ? "text-[#01D167]" : "text-gray-500",
                  "mb-1"
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};
