import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Command copied to clipboard");
  });
};
