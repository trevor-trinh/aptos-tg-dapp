import { WalletSelector } from "@/components/WalletSelector";

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-8 py-4 max-w-screen-xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 bg-clip-text text-transparent animate-pulse">
            🚀 APE SWIPER 🦍
          </h1>
          <div className="px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30 ml-4 animate-bounce">
            <p className="text-green-400 text-sm font-mono">WAGMI 🌙</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30 animate-pulse">
            <p className="text-red-400 font-mono">GAS: 🔥 NGMI SER</p>
          </div>
          <div className="px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30 hidden md:block">
            <p className="text-yellow-400 font-mono">📈 ONLY UP</p>
          </div>
          <WalletSelector />
        </div>
      </div>
    </div>
  );
}
