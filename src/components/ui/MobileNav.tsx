"use client";

import Image from "next/image";
import HomeIconSvg from "@/assets/icons/Home.svg";
import CardIconSvg from "@/assets/icons/Card.svg";
import PaymentsIconSvg from "@/assets/icons/Payments.svg";
import CreditIconSvg from "@/assets/icons/Credit.svg";
import AccountIconSvg from "@/assets/icons/Account.svg";
import { cn } from "@/utils/cn";

interface MobileNavProps {
  className?: string;
}

export const MobileNav = ({ className }: MobileNavProps) => {
  const navigationItems = [
    {
      icon: HomeIconSvg,
      label: "Home",
      href: "/",
      active: false,
    },
    {
      icon: CardIconSvg,
      label: "Cards",
      href: "/cards",
      active: true,
    },
    {
      icon: PaymentsIconSvg,
      label: "Payments",
      href: "/payments",
      active: false,
    },
    {
      icon: CreditIconSvg,
      label: "Credit",
      href: "/credit",
      active: false,
    },
    {
      icon: AccountIconSvg,
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
          return (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1",
                item.active ? "text-[#01D167]" : "text-gray-500"
              )}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className={cn(
                  "mb-1",
                  item.active
                    ? "brightness-0 saturate-100"
                    : "brightness-0 opacity-60"
                )}
                style={{
                  filter: item.active
                    ? "brightness(0) saturate(100%) invert(50%) sepia(85%) saturate(1945%) hue-rotate(85deg) brightness(94%) contrast(101%)"
                    : "",
                }}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};
