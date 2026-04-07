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

import * as prettier from "prettier/standalone";
import * as babel from "prettier/plugins/babel";
import * as estree from "prettier/plugins/estree";

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

  const handlePrettify = useCallback(async () => {
    try {
      const formatted = await prettier.format(code, {
        parser: "babel",
        plugins: [babel, estree],
        semi: true,
      });
      updateCode(formatted);
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
