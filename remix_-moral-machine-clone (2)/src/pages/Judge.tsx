import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DILEMMAS } from "@/src/constants/dilemmas";
import DilemmaCard from "@/src/components/organisms/DilemmaCard";
import { useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { useGameStore } from "@/src/store/useGameStore";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Dilemma, Character } from "../types";

export default function Judge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [friends, setFriends] = useState<any[]>([]);
  const addDecision = useGameStore((state) => state.addDecision);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          const friendsUids = userDoc.data().friends || [];
          if (friendsUids.length > 0) {
            const friendsData = await Promise.all(
              friendsUids.slice(0, 3).map(async (uid: string) => {
                const fDoc = await getDoc(doc(db, "users", uid));
                return fDoc.exists() ? fDoc.data() : null;
              })
            );
            setFriends(friendsData.filter(f => f !== null));
          }
        }
      }
    };
    fetchFriends();
  }, []);

  const dynamicDilemmas = useMemo(() => {
    if (friends.length === 0) return DILEMMAS;

    return DILEMMAS.map((d, idx) => {
      // Inject friend into dilemma 1 and 5 for variety
      if (idx === 0 || idx === 4) {
        const friend = friends[idx % friends.length];
        const newDilemma = { ...d };
        const leftScenario = { ...newDilemma.leftScenario };
        
        // Replace first character with friend
        const friendChar: Character = {
          type: "friend",
          count: 1,
          ageGroup: "adult",
          gender: friend.gender || "neutral",
          socialStatus: "medium",
          isHuman: true
        };
        
        leftScenario.description = `Carro em direção ao seu amigo ${friend.displayName} e outros.`;
        leftScenario.characters = [friendChar, ...leftScenario.characters.slice(1)];
        
        return { ...newDilemma, leftScenario };
      }
      return d;
    });
  }, [friends]);

  const currentDilemma = dynamicDilemmas[currentIndex];

  const handleSelect = (scenario: any) => {
    addDecision(scenario);

    if (currentIndex < dynamicDilemmas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/results");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="text-center mb-12">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-purple-500 mb-2">
          Dilema {currentIndex + 1} de {DILEMMAS.length}
        </h2>
        <h1 className="text-4xl font-bold tracking-tight">O que o carro deve fazer?</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`left-${currentDilemma.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DilemmaCard
              scenario={currentDilemma.leftScenario}
              onSelect={() => handleSelect(currentDilemma.leftScenario)}
              side="left"
            />
          </motion.div>

          <motion.div
            key={`right-${currentDilemma.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <DilemmaCard
              scenario={currentDilemma.rightScenario}
              onSelect={() => handleSelect(currentDilemma.rightScenario)}
              side="right"
            />
          </motion.div>
        </AnimatePresence>

        {/* VS Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full bg-black border border-white/20 items-center justify-center z-10 font-bold text-xs tracking-tighter">
          VS
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="flex gap-2">
          {DILEMMAS.map((_, idx) => (
            <div 
              key={idx}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                idx === currentIndex ? "w-8 bg-purple-500" : "w-2 bg-white/10",
                idx < currentIndex ? "bg-purple-500/40" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
