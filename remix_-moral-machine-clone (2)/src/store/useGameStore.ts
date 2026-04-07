import { create } from "zustand";
import { Dilemma, Scenario, EthicalProfile } from "../types";

interface GameState {
  decisions: Scenario[];
  addDecision: (scenario: Scenario) => void;
  resetGame: () => void;
  calculateProfile: () => EthicalProfile;
}

export const useGameStore = create<GameState>((set, get) => ({
  decisions: [],
  addDecision: (scenario) => set((state) => ({ decisions: [...state.decisions, scenario] })),
  resetGame: () => set({ decisions: [] }),
  calculateProfile: () => {
    const { decisions } = get();
    const profile: EthicalProfile = {
      savingHumans: 0,
      savingAnimals: 0,
      savingYoung: 0,
      savingElderly: 0,
      savingHighStatus: 0,
      savingLowStatus: 0,
      savingMale: 0,
      savingFemale: 0,
      savingFriends: 0,
      followingLaw: 0,
    };

    if (decisions.length === 0) return profile;

    decisions.forEach((scenario) => {
      if (scenario.isBraking) profile.followingLaw++;
      
      scenario.characters.forEach((char) => {
        const weight = char.count;
        if (char.isHuman) profile.savingHumans += weight;
        else profile.savingAnimals += weight;

        if (char.type === "friend") profile.savingFriends += weight;

        if (char.ageGroup === "child") profile.savingYoung += weight;
        if (char.ageGroup === "elderly") profile.savingElderly += weight;

        if (char.socialStatus === "high") profile.savingHighStatus += weight;
        if (char.socialStatus === "low") profile.savingLowStatus += weight;

        if (char.gender === "male") profile.savingMale += weight;
        if (char.gender === "female") profile.savingFemale += weight;
      });
    });

    return profile;
  },
}));
