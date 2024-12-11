import { Header } from "@/components/Header";
import { Swiper } from "@/components/Swiper";

function App() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center flex-col bg-gradient-to-b from-[#FF00FF] via-[#00FFFF] to-[#FF00FF]">
        <Swiper />
      </div>
    </>
  );
}

export default App;
