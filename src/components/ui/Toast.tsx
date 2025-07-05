import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { X, CheckCircle, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onClose, 300); // Animation duration
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  if (!isVisible) return null;

  const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    info: AlertCircle,
  };

  const Icon = iconMap[type];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg p-4 shadow-lg transition-all duration-300",
          "min-w-[300px] max-w-[500px]",
          {
            "bg-green-50 border border-green-200 text-green-800":
              type === "success",
            "bg-red-50 border border-red-200 text-red-800": type === "error",
            "bg-blue-50 border border-blue-200 text-blue-800": type === "info",
          },
          isExiting
            ? "transform translate-x-full opacity-0"
            : "transform translate-x-0 opacity-100"
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 rounded-full p-1 hover:bg-black/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Toast container for managing multiple toasts
interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemoveToast: (id: string) => void;
}

export const ToastContainer = ({
  toasts,
  onRemoveToast,
}: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </div>
  );
};
