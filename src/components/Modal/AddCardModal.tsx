"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { CardFormData } from "@/types/card";
import { cn } from "@/utils/cn";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CardFormData) => Promise<void>;
  loading?: boolean;
}

export const AddCardModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
}: AddCardModalProps) => {
  const [formData, setFormData] = useState<CardFormData>({ name: "" });
  const [errors, setErrors] = useState<Partial<CardFormData>>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string): string | null => {
    const trimmedValue = value.trim();

    switch (name) {
      case "name":
        if (!trimmedValue) {
          return "Cardholder name is required";
        }
        if (trimmedValue.length < 2) {
          return "Name must be at least 2 characters long";
        }
        if (trimmedValue.length > 50) {
          return "Name must be less than 50 characters long";
        }
        if (!/^[a-zA-Z\s'-]+$/.test(trimmedValue)) {
          return "Name can only contain letters, spaces, hyphens, and apostrophes";
        }
        // Check for consecutive spaces
        if (/\s{2,}/.test(trimmedValue)) {
          return "Name cannot contain consecutive spaces";
        }
        // Check for valid name format (at least first and last name)
        const nameParts = trimmedValue
          .split(" ")
          .filter((part) => part.length > 0);
        if (nameParts.length < 2) {
          return "Please enter both first and last name";
        }
        return null;
      default:
        return null;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CardFormData> = {};

    const nameError = validateField("name", formData.name);
    if (nameError) {
      newErrors.name = nameError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation only if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true });

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({ name: formData.name.trim() });
      setFormData({ name: "" });
      setErrors({});
      setTouched({});
      onClose();
    } catch (error) {
      console.error("Failed to add card:", error);
    }
  };

  const handleClose = () => {
    setFormData({ name: "" });
    setErrors({});
    setTouched({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Card</h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="cardName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cardholder Name
            </label>
            <input
              id="cardName"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-sm transition-colors text-gray-900",
                "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                "placeholder:text-gray-500",
                errors.name
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white"
              )}
              placeholder="Enter full name (e.g., John Doe)"
              disabled={loading}
              autoComplete="name"
            />
            <div className="flex justify-between items-center mt-1">
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
              {!errors.name && (
                <p className="text-xs text-gray-500">
                  Enter your full name as it appears on your ID
                </p>
              )}
              <span className="text-xs text-gray-400">
                {formData.name.length}/50
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Card number, expiration date, and CVV will
              be automatically generated for security.
            </p>
          </div>

          {/* Loading state info */}
          {loading && (
            <div className="rounded-lg bg-yellow-50 p-3">
              <p className="text-xs text-yellow-800">
                <strong>Creating your card...</strong> Please wait while we
                generate your secure card details.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className={cn(
                "flex-1",
                !errors.name &&
                  formData.name.trim() &&
                  "bg-green-600 hover:bg-green-700"
              )}
              loading={loading}
              disabled={loading || !formData.name.trim()}
            >
              {loading ? "Adding Card..." : "Add Card"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
