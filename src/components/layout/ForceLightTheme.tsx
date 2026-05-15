"use client";

import { useEffect } from "react";

/**
 * Giữ trang auth luôn light mode — không bị ảnh hưởng bởi toggle dark ở marketing.
 * Không đổi preference trong localStorage; chỉ gỡ class `dark` trên <html> tạm thời.
 */
export function ForceLightTheme({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    const wasDark = html.classList.contains("dark");

    html.classList.remove("dark");
    html.style.colorScheme = "light";

    const observer = new MutationObserver(() => {
      if (html.classList.contains("dark")) {
        html.classList.remove("dark");
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      html.style.colorScheme = "";
      if (wasDark) {
        html.classList.add("dark");
      }
    };
  }, []);

  return <>{children}</>;
}
