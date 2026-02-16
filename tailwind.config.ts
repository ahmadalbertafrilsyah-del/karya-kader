import type { Config } from "tailwindcss";
import { withUploadThing } from "uploadthing/console"; // (Biarkan kalau ada ini)

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      // Kita suruh Tailwind: "Kalau ada class font-sans, pakai font Poynter kita!"
      sans: ["var(--font-poynter)", "serif"], 
      },
      // ----------------------------
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Pastikan plugin ini ada (untuk artikel)
  ],
};

export default config;