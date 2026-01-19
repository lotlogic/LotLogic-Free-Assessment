/******************************************************

	Utilities - Text

******************************************************/
export const toSentenceCase = (str?: string | null) => {
  if (!str) return "";
  const lowercased = str.toLowerCase();
  return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
};
