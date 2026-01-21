/******************************************************

	Utilities - Tailwind

******************************************************/
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const classList = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
