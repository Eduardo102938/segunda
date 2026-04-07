export type CharacterType = 
  | "man" 
  | "woman" 
  | "boy" 
  | "girl" 
  | "elderly_man" 
  | "elderly_woman" 
  | "dog" 
  | "cat" 
  | "pregnant_woman" 
  | "doctor" 
  | "criminal" 
  | "homeless"
  | "executive"
  | "athlete"
  | "friend";

export interface Character {
  type: CharacterType;
  count: number;
  ageGroup: "child" | "adult" | "elderly";
  gender: "male" | "female" | "neutral";
  socialStatus: "high" | "medium" | "low";
  isHuman: boolean;
}

export interface Scenario {
  id: string;
  description: string;
  characters: Character[];
  isBraking: boolean;
  imageUrl: string;
}

export interface Dilemma {
  id: number;
  leftScenario: Scenario;
  rightScenario: Scenario;
}

export interface EthicalProfile {
  savingHumans: number;
  savingAnimals: number;
  savingYoung: number;
  savingElderly: number;
  savingHighStatus: number;
  savingLowStatus: number;
  savingMale: number;
  savingFemale: number;
  savingFriends: number;
  followingLaw: number; // based on isBraking (staying in lane vs swerving)
}
