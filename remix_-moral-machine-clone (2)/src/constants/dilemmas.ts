import { Dilemma } from "../types";

export const DILEMMAS: Dilemma[] = [
  {
    id: 1,
    leftScenario: {
      id: "1a",
      description: "Carro em direção a um manequim adulto masculino e um manequim adulto feminino na faixa de pedestres.",
      imageUrl: "",
      characters: [
        { type: "man", count: 1, ageGroup: "adult", gender: "male", socialStatus: "medium", isHuman: true },
        { type: "woman", count: 1, ageGroup: "adult", gender: "female", socialStatus: "medium", isHuman: true }
      ],
      isBraking: true
    },
    rightScenario: {
      id: "1b",
      description: "Carro desviando para barreira, sacrificando manequins idosos (curvados) dentro do veículo.",
      imageUrl: "",
      characters: [
        { type: "elderly_man", count: 1, ageGroup: "elderly", gender: "male", socialStatus: "medium", isHuman: true },
        { type: "elderly_woman", count: 1, ageGroup: "elderly", gender: "female", socialStatus: "medium", isHuman: true }
      ],
      isBraking: false
    }
  },
  {
    id: 2,
    leftScenario: {
      id: "2a",
      description: "Carro em direção a três manequins infantis pequenos brincando na pista.",
      imageUrl: "",
      characters: [
        { type: "boy", count: 2, ageGroup: "child", gender: "male", socialStatus: "medium", isHuman: true },
        { type: "girl", count: 1, ageGroup: "child", gender: "female", socialStatus: "medium", isHuman: true }
      ],
      isBraking: true
    },
    rightScenario: {
      id: "2b",
      description: "Carro em direção a três manequins adultos com roupas listradas de prisioneiro.",
      imageUrl: "",
      characters: [
        { type: "criminal", count: 3, ageGroup: "adult", gender: "male", socialStatus: "low", isHuman: true }
      ],
      isBraking: true
    }
  },
  {
    id: 3,
    leftScenario: {
      id: "3a",
      description: "Carro em direção a dois manequins adultos usando gravatas e maletas executivas.",
      imageUrl: "",
      characters: [
        { type: "executive", count: 2, ageGroup: "adult", gender: "neutral", socialStatus: "high", isHuman: true }
      ],
      isBraking: true
    },
    rightScenario: {
      id: "3b",
      description: "Carro em direção a dois manequins adultos em trapos, sentados no chão.",
      imageUrl: "",
      characters: [
        { type: "homeless", count: 2, ageGroup: "adult", gender: "neutral", socialStatus: "low", isHuman: true }
      ],
      isBraking: true
    }
  },
  {
    id: 4,
    leftScenario: {
      id: "4a",
      description: "Carro em direção a silhuetas simples de dois cães e um gato.",
      imageUrl: "",
      characters: [
        { type: "dog", count: 2, ageGroup: "adult", gender: "neutral", socialStatus: "medium", isHuman: false },
        { type: "cat", count: 1, ageGroup: "adult", gender: "neutral", socialStatus: "medium", isHuman: false }
      ],
      isBraking: true
    },
    rightScenario: {
      id: "4b",
      description: "Carro em direção a um manequim adulto feminino com barriga de gravidez proeminente.",
      imageUrl: "",
      characters: [
        { type: "pregnant_woman", count: 1, ageGroup: "adult", gender: "female", socialStatus: "medium", isHuman: true }
      ],
      isBraking: true
    }
  },
  {
    id: 5,
    leftScenario: {
      id: "5a",
      description: "Carro em direção a dois manequins adultos em pose de corrida atlética.",
      imageUrl: "",
      characters: [
        { type: "athlete", count: 2, ageGroup: "adult", gender: "male", socialStatus: "high", isHuman: true }
      ],
      isBraking: true
    },
    rightScenario: {
      id: "5b",
      description: "Carro em direção a dois manequins adultos usando jalecos brancos e estetoscópios.",
      imageUrl: "",
      characters: [
        { type: "doctor", count: 2, ageGroup: "adult", gender: "neutral", socialStatus: "high", isHuman: true }
      ],
      isBraking: true
    }
  },
  {
    id: 6,
    leftScenario: {
      id: "6a",
      description: "Carro em direção a dois manequins femininos atravessando com sinal verde.",
      imageUrl: "",
      characters: [
        { type: "woman", count: 2, ageGroup: "adult", gender: "female", socialStatus: "medium", isHuman: true }
      ],
      isBraking: true
    },
    rightScenario: {
      id: "6b",
      description: "Carro em direção a dois manequins masculinos atravessando com sinal vermelho.",
      imageUrl: "",
      characters: [
        { type: "man", count: 2, ageGroup: "adult", gender: "male", socialStatus: "medium", isHuman: true }
      ],
      isBraking: false
    }
  },
  {
    id: 7,
    leftScenario: {
      id: "7a",
      description: "Carro em direção a três manequins idosos curvados.",
      imageUrl: "",
      characters: [
        { type: "elderly_woman", count: 3, ageGroup: "elderly", gender: "female", socialStatus: "medium", isHuman: true }
      ],
      isBraking: true
    },
    rightScenario: {
      id: "7b",
      description: "Carro em direção a três manequins infantis pequenos.",
      imageUrl: "",
      characters: [
        { type: "girl", count: 3, ageGroup: "child", gender: "female", socialStatus: "medium", isHuman: true }
      ],
      isBraking: true
    }
  },
  {
    id: 8,
    leftScenario: {
      id: "8a",
      description: "Carro sacrificando dois manequins adultos masculinos dentro do veículo contra um muro.",
      imageUrl: "",
      characters: [
        { type: "man", count: 2, ageGroup: "adult", gender: "male", socialStatus: "medium", isHuman: true }
      ],
      isBraking: false
    },
    rightScenario: {
      id: "8b",
      description: "Carro em direção a dois manequins femininos na calçada.",
      imageUrl: "",
      characters: [
        { type: "woman", count: 2, ageGroup: "adult", gender: "female", socialStatus: "medium", isHuman: true }
      ],
      isBraking: true
    }
  }
];
