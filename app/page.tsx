import dynamic from "next/dynamic";

// dynamic import stops hydration error
// more info here:
// https://www.youtube.com/watch?v=Hx2UqlhPmnc&t=180s
const DynamicBody = dynamic(() => import("@/components/Body"), { ssr: false });

export default function Home() {
  return (
    <>
      <main>
        <DynamicBody />
      </main>
    </>
  );
}
