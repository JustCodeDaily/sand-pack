//   These hooks give us clean, reusable actions:
//   - useResetCode()     → Reset all files to their original state
//   - usePrettifyCode()  → Format the active file's code
//   - useToggleLineNumbers() → Show/hide line numbers (with key trick)
//   - useRefreshPreview() → Refresh the preview iframe
//   - useCopyCode()      → Copy active file code to clipboard
//    IMPORTANT: All these hooks use useSandpack() internally,
//.   and must be called inside the wrapper

import { useState, useCallback } from "react";
import {
  useSandpack,
  useActiveCode,
  useSandpackNavigation,
} from "@codesandbox/sandpack-react";

// Resets Code
export const useResetCode = () => {
  const { sandpack } = useSandpack();
  const handleReset = useCallback(() => {
    sandpack.resetAllFiles();
  }, [sandpack]);
  return { handleReset };
};

// Prettify Code
export const usePrettifyCode = () => {
  const { code, updateCode } = useActiveCode();
  const handlePrettify = useCallback(() => {
    try {
      const lines = code.split("\n");
      const cleaned = lines
        .map((line) => line.trimEnd()) // Remove trailing whitespace per line
        .join("\n")
        .replace(/\n{3,}/g, "\n\n") // Collapse 3+ blank lines into 2
        .trim(); // Remove leading/trailing blank lines
      updateCode(cleaned);
    } catch (error) {
      console.error("Prettify failed:", error);
    }
  }, [code, updateCode]);

  return { handlePrettify };
};

// Toggle Line Numbers
export const useToggleLineNumbers = (initialValue = true) => {
  const [showLineNumbers, setShowLineNumbers] = useState(initialValue);
  const [editorKey, setEditorKey] = useState(0);

  const toggleLineNumbers = useCallback(() => {
    setShowLineNumbers((prev) => !prev);
    setEditorKey((prev) => prev + 1);
  }, []);

  return { showLineNumbers, editorKey, toggleLineNumbers };
};

// Refresh Preview
export const useRefreshPreview = () => {
  const { refresh } = useSandpackNavigation();

  const handleRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  return { handleRefresh };
};

// Copy Code
export const useCopyCode = () => {
  const { code } = useActiveCode();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }, [code]);

  return { handleCopy, copied };
};
