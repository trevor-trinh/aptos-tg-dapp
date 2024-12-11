import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RefreshCw, TrendingUp, ChevronUp, ChevronDown } from "lucide-react";

const INITIAL_TOKENS = [
  {
    ticker: "EDOG",
    contract: "0x5e975e7f36f2658d4cf146142899c659464a3e0d90f0f4d5f8b2447173c06ef6::EDOG::EDOG",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/33437.png",
    market_cap: "$831.49K",
    website: "https://x.com/EdogApt",
    apy: "6,942.0%",
    price: 0.00042,
    change: "+420.69%",
  },
  {
    ticker: "Chewy",
    contract: "0xc26a8eda1c3ab69a157815183ddda88c89d6758ee491dd1647a70af2907ce074::coin::Chewy",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/30840.png",
    market_cap: "$801.39K",
    website: "https://x.com/ChewyToken",
    apy: "4,269.0%",
    price: 0.00069,
    change: "+169.42%",
  },
  {
    ticker: "Doodoo",
    contract: "0x73eb84966be67e4697fc5ae75173ca6c35089e802650f75422ab49a8729704ec::coin::DooDoo",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/28881.png",
    market_cap: "$1.16M",
    website: "https://x.com/doodoocoin",
    apy: "8,008.0%",
    price: 0.00123,
    change: "+789.42%",
  },
];

export function Swiper() {
  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_TOKENS.length - 1);
  const [lastDirection, setLastDirection] = useState<string>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tradeAmount, setTradeAmount] = useState(100);

  const childRefs = useMemo(
    () =>
      Array(tokens.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    [tokens.length],
  );

  const handleBuy = async (contract: string, amount: number) => {
    toast({
      title: "🚀 Aping in! 🦍",
      description: `Buying $${amount} worth of tokens! WAGMI!`,
    });
  };

  const handleSell = async (contract: string, amount: number) => {
    toast({
      title: "📄 Paper hands!",
      description: `Selling $${amount} worth of tokens! NGMI ser!`,
    });
  };

  const swiped = (direction: string, contract: string, index: number) => {
    setLastDirection(direction);
    setCurrentIndex(index - 1);
    if (direction === "right") {
      handleBuy(contract, tradeAmount);
    } else if (direction === "left") {
      handleSell(contract, tradeAmount);
    }
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndex);
  };

  const swipe = async (dir: string) => {
    if (currentIndex < 0) return;
    await childRefs[currentIndex].current.swipe(dir);
  };

  const handleRefresh = () => {
    window.location.reload();
    toast({
      title: "🔄 Refreshed!",
      description: "Ready to ape into more tokens! 🚀",
    });
  };

  const adjustTradeAmount = (delta: number) => {
    setTradeAmount((prev) => Math.max(10, prev + delta));
    toast({
      title: "💰 Trade Amount Updated",
      description: `New trade amount: $${tradeAmount + delta}`,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-8">
      <div className="w-[90vw] max-w-3xl mx-auto relative">
        {/* Trade Amount Controls */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-black/40 px-6 py-2 rounded-full backdrop-blur-lg border border-white/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => adjustTradeAmount(-10)}
            className="text-white hover:text-white/80"
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
          <div className="text-xl font-bold text-white">${tradeAmount}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => adjustTradeAmount(10)}
            className="text-white hover:text-white/80"
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
        </div>

        {currentIndex < 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6">No More Tokens! 😢</h2>
            <Button
              onClick={handleRefresh}
              className="text-xl p-8 rounded-2xl bg-gradient-to-r from-[#22c55e] to-[#3b82f6] hover:from-[#16a34a] hover:to-[#2563eb] transition-all hover:scale-105 shadow-xl shadow-green-500/20"
            >
              <RefreshCw className={`w-8 h-8 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Find More Tokens
            </Button>
          </div>
        )}

        <div className="relative h-[75vh] overflow-hidden rounded-3xl bg-gradient-to-b from-black/50 to-black/20 backdrop-blur-xl border border-white/10">
          <div className="absolute inset-0">
            {tokens.map((token, index) => (
              <TinderCard
                ref={childRefs[index]}
                key={`${token.contract}-${index}`}
                onSwipe={(dir) => swiped(dir, token.contract, index)}
                onCardLeftScreen={() => outOfFrame(token.ticker, index)}
                className="absolute left-0 right-0 mx-auto cursor-grab active:cursor-grabbing"
                swipeRequirementType="position"
                swipeThreshold={100}
                preventSwipe={["up", "down"]}
              >
                <div
                  className="relative w-full h-[75vh] overflow-hidden bg-gradient-to-br from-[#1a1f25] to-[#121417] p-8 flex flex-col justify-between transform transition-transform hover:scale-[1.02] shadow-2xl shadow-black/50"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${token.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className="absolute inset-0 backdrop-blur-xl bg-gradient-to-b from-black/30 to-black/60"
                    style={{ zIndex: 1 }}
                  ></div>

                  {/* Main Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur"></div>
                        <img
                          src={token.image}
                          alt={token.ticker}
                          className="relative w-24 h-24 rounded-full border-2 border-white/20"
                        />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-2">{token.ticker}</h3>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
                            <p className="text-purple-400 font-mono">${token.price.toFixed(5)}</p>
                          </div>
                          <div className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                            <p className="text-green-400 font-mono flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" /> {token.change}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white/60 text-sm mb-1">Market Cap</p>
                        <p className="text-white font-mono text-lg">{token.market_cap}</p>
                      </div>
                      <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white/60 text-sm mb-1">APY</p>
                        <p className="text-green-400 font-mono text-lg">{token.apy}</p>
                      </div>
                    </div>

                    <a
                      href={token.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors text-lg flex items-center gap-2 hover:scale-105 transform"
                    >
                      🔗 {token.website}
                    </a>
                  </div>

                  {/* Trade Preview */}
                  <div className="relative z-10 mt-auto">
                    <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-white/60 mb-2">Trade Preview</p>
                      <p className="text-xl text-white font-mono">
                        {`${(tradeAmount / token.price).toFixed(2)} ${token.ticker}`}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-white/80 text-xl">
                      <div className="flex items-center gap-2 text-red-400/80">👈 Sell ${tradeAmount}</div>
                      <div className="flex items-center gap-2 text-green-400/80">Buy ${tradeAmount} 👉</div>
                    </div>
                  </div>
                </div>
              </TinderCard>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-12 mt-8">
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-24 h-24 p-0 text-4xl hover:scale-110 transition-transform shadow-xl shadow-red-500/20 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            onClick={() => swipe("left")}
          >
            📄
          </Button>
          <Button
            variant="green"
            size="lg"
            className="rounded-full w-24 h-24 p-0 text-4xl hover:scale-110 transition-transform shadow-xl shadow-green-500/20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            onClick={() => swipe("right")}
          >
            💎
          </Button>
        </div>

        {lastDirection && (
          <div className="text-center mt-6 text-2xl font-bold animate-bounce bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-transparent bg-clip-text p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {lastDirection === "right" ? "💎 DIAMOND HANDS LFG!!!" : "📄 NGMI PAPER HANDS SER"}
          </div>
        )}
      </div>
    </div>
  );
}
