import { 
  User, 
  UserRound, 
  Baby, 
  Dog, 
  Cat, 
  Stethoscope, 
  ShieldAlert, 
  PersonStanding,
  Heart
} from "lucide-react";
import { CharacterType } from "@/src/types";

export const CharacterIcon = ({ type, className }: { type: CharacterType; className?: string }) => {
  switch (type) {
    case "friend":
      return <Heart className={className} />;
    case "man":
    case "elderly_man":
      return <User className={className} />;
    case "woman":
    case "elderly_woman":
    case "pregnant_woman":
      return <UserRound className={className} />;
    case "boy":
    case "girl":
      return <Baby className={className} />;
    case "dog":
      return <Dog className={className} />;
    case "cat":
      return <Cat className={className} />;
    case "doctor":
      return <Stethoscope className={className} />;
    case "criminal":
      return <ShieldAlert className={className} />;
    case "homeless":
      return <PersonStanding className={className} />;
    case "executive":
      return <User className={className} />;
    case "athlete":
      return <User className={className} />;
    default:
      return <User className={className} />;
  }
};

export const getCharacterLabel = (type: CharacterType) => {
  const labels: Record<CharacterType, string> = {
    man: "Homem",
    woman: "Mulher",
    boy: "Menino",
    girl: "Menina",
    elderly_man: "Idoso",
    elderly_woman: "Idosa",
    dog: "Cão",
    cat: "Gato",
    pregnant_woman: "Grávida",
    doctor: "Médico(a)",
    criminal: "Criminoso(a)",
    homeless: "Morador de rua",
    executive: "Executivo(a)",
    athlete: "Atleta",
    friend: "Seu Amigo"
  };
  return labels[type] || type;
};
