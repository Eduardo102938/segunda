import { motion } from "motion/react";
import { Scenario } from "@/src/types";
import { CharacterIcon, getCharacterLabel } from "../atoms/CharacterIcon";
import ScenarioImage from "../atoms/ScenarioImage";
import { cn } from "@/src/lib/utils";

interface DilemmaCardProps {
  scenario: Scenario;
  onSelect: () => void;
  side: "left" | "right";
}

export default function DilemmaCard({ scenario, onSelect, side }: DilemmaCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col h-full cursor-pointer group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl transition-all hover:border-purple-500/50 hover:bg-zinc-900/80",
        side === "left" ? "items-start" : "items-end"
      )}
    >
      {/* Visual Indicator */}
      <div className={cn(
        "absolute top-0 w-full h-1 bg-gradient-to-r z-10",
        side === "left" ? "from-purple-500 to-transparent" : "from-transparent to-purple-500"
      )} />

      {/* Scenario Image (AI Generated) */}
      <div className="relative w-full h-48 overflow-hidden">
        <ScenarioImage 
          prompt={scenario.description} 
          description={scenario.description}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
      </div>

      <div className="p-8 flex flex-col h-full w-full">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2 block">
            Cenário {side === "left" ? "A" : "B"}
          </span>
          <h3 className="text-xl font-semibold leading-tight text-white group-hover:text-purple-300 transition-colors">
            {scenario.description}
          </h3>
        </div>

        {/* Character Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {scenario.characters.map((char, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <CharacterIcon type={char.type} className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">{char.count}x</p>
                <p className="text-[10px] uppercase tracking-tighter text-zinc-500">{getCharacterLabel(char.type)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              scenario.isBraking ? "bg-red-500" : "bg-blue-500"
            )} />
            <span className="text-[10px] uppercase font-bold text-zinc-400">
              {scenario.isBraking ? "Falha nos Freios" : "Desvio de Rota"}
            </span>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400 text-xs font-bold uppercase tracking-tighter">
            Selecionar Cenário →
          </div>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
