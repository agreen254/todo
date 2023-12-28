import dynamic from "next/dynamic";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";

// dynamic import stops hydration error
// more info here:
// https://www.youtube.com/watch?v=Hx2UqlhPmnc&t=180s
const DynamicBody = dynamic(() => import("./components/Body"), { ssr: false });

export default function Home() {
  return (
    <>
      <main className="min-h-[calc(100vh-100px)]">
        <ThemeSwitcher />
        <DynamicBody />
      </main>
      <footer className="min-h-[100px] mt-5 mb-[100px] lg:mb-auto overflow-y-auto">
        <Footer />
      </footer>
    </>
  );
}
