"use client";

import { useEffect, useState } from "react";

/**
 * ⌘ on the server and on Apple keyboards, corrected to Ctrl after mount — so the
 * printed shortcut matches the keyboard the reader actually has without a
 * hydration mismatch. The gap is a non-breaking space: one keycap, not two.
 */
export function useModKey() {
  const [modKey, setModKey] = useState("⌘ K");

  useEffect(() => {
    const mac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
    if (!mac) setModKey("Ctrl K");
  }, []);

  return modKey;
}
