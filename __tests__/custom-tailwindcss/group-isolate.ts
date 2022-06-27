import { tailwindRunner } from "../tailwindcss/runner";

tailwindRunner("Custom Tailwind CSS - Isolate Group", [
  [
    "group-isolate-hover:text-green-500",
    {
      styles: {
        "group-isolate-hover:text-green-500": { color: "#22c55e" },
      },
      masks: {
        "group-isolate-hover:text-green-500": 64,
      },
    },
  ],
]);
