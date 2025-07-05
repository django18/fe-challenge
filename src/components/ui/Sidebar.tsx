"use client";

import AspireLogoSvg from "@/assets/icons/Aspire-Logo.svg";
import HomeIconSvg from "@/assets/icons/Home.svg";
import CardIconSvg from "@/assets/icons/Card.svg";
import PaymentsIconSvg from "@/assets/icons/Payments.svg";
import CreditIconSvg from "@/assets/icons/Credit.svg";
import AccountIconSvg from "@/assets/icons/Account.svg";
import { cn } from "@/utils/cn";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
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
      label: "Settings",
      href: "/settings",
      active: false,
    },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-[#0C365A] text-white flex flex-col",
        className
      )}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-[#1a4d73]">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center">
            <AspireLogoSvg className="text-white" width={125} height={35} />
          </div>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                    item.active
                      ? "text-[#01D167]"
                      : "text-gray-300 hover:text-[#01D167]"
                  )}
                >
                  <IconComponent
                    width={24}
                    height={24}
                    className={cn(
                      "transition-colors",
                      item.active ? "text-[#01D167]" : "text-gray-300"
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
