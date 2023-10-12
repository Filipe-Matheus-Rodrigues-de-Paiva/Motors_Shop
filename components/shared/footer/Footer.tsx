"use client";

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-8 bg-gray-100 px-5 py-6 sm:flex-row sm:justify-between">
      <h1 className="heading-5-600 text-white">Motors shop</h1>
      <p className="body-2-400">© 2022 - Todos os direitos reservados.</p>
      <button
        className="h-12 w-14 rounded bg-gray-200 text-base font-black text-white"
        onClick={handleScrollToTop}
      >
        ^
      </button>
    </footer>
  );
}
