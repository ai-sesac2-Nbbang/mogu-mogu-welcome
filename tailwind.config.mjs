/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ← 클래스 방식 강제
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
