"use client";

import { Transaction } from "@/types/card";
import {
  ShoppingBag,
  ArrowUpRight,
  RotateCcw,
  CreditCard,
  Plane,
  Megaphone,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface TransactionListProps {
  transactions: Transaction[];
  className?: string;
}

export const TransactionList = ({
  transactions,
  className,
}: TransactionListProps) => {
  const getTransactionIcon = (
    iconType: Transaction["iconType"],
    type: Transaction["type"]
  ) => {
    if (type === "credit") {
      return (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <RotateCcw className="w-4 h-4 text-blue-600" />
        </div>
      );
    }

    switch (iconType) {
      case "shopping":
        return (
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-teal-600" />
          </div>
        );
      case "plane":
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <Plane className="w-4 h-4 text-purple-600" />
          </div>
        );
      case "megaphone":
        return (
          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
            <Megaphone className="w-4 h-4 text-pink-600" />
          </div>
        );
      case "card":
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-green-600" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-gray-600" />
          </div>
        );
    }
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {transactions.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No transactions found for this card
        </div>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-start space-x-3">
            {getTransactionIcon(transaction.iconType, transaction.type)}

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  {transaction.merchantName}
                </span>
                <span
                  className={cn(
                    "font-semibold",
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-gray-900"
                  )}
                >
                  {transaction.type === "credit" ? "+" : "-"} S${" "}
                  {Math.abs(transaction.amount)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-500">
                  {formatDate(transaction.date)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {/* <div className="w-[24px] h-[20px] bg-[#325BAF] rounded-full flex items-center justify-center">
                  <Icon
                    name="card"
                    className="text-white w-[10px] h-[10px]"
                    size={10}
                  />
                </div> */}
                <span className="text-sm text-[#325BAF]">
                  {transaction.type === "credit"
                    ? "Refund on debit card"
                    : "Charged to debit card"}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
