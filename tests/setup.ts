import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// next/image → einfaches <img>, damit Komponenten ohne Next-Runtime testbar sind
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown> & { src: unknown; alt: string }) => {
    const { src, alt, priority: _priority, fill: _fill, ...rest } = props;
    const resolved =
      typeof src === "object" && src !== null && "src" in src
        ? (src as { src: string }).src
        : String(src);
    return React.createElement("img", { ...rest, src: resolved, alt });
  },
}));
