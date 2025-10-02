// components/fonts.ts
import { Do_Hyeon } from "next/font/google";

export const doHyeon = Do_Hyeon({
  weight: "400",
  subsets: ["latin"], // ✅ 한글 포함
  display: "swap",
  variable: "--font-dohyeon",
});
