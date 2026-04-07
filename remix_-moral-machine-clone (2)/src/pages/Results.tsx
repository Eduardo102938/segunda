import { useGameStore } from "@/src/store/useGameStore";
import { motion } from "motion/react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  PolarRadiusAxis,
  Legend
} from "recharts";
import { Link } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, arrayUnion, getDoc, Timestamp } from "firebase/firestore";
import { EthicalProfile } from "../types";
import { User as UserIcon, Users, Globe, UserPlus, Check } from "lucide-react";

interface ResultsProps {
  user: User | null;
}

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  friends: string[];
}

export default function Results({ user }: ResultsProps) {
  const decisions = useGameStore((state) => state.decisions);
  const calculateProfile = useGameStore((state) => state.calculateProfile);
  const [globalAverage, setGlobalAverage] = useState<EthicalProfile | null>(null);
  const [friendsAverage, setFriendsAverage] = useState<EthicalProfile | null>(null);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);

  const profile = useMemo(() => calculateProfile(), [decisions, calculateProfile]);

  // Save result to Firestore
  useEffect(() => {
    const saveResult = async () => {
      if (user && decisions.length > 0 && !saving) {
        setSaving(true);
        try {
          await addDoc(collection(db, "results"), {
            uid: user.uid,
            profile,
            timestamp: Timestamp.now()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, "results");
        } finally {
          setSaving(false);
        }
      }
    };
    saveResult();
  }, [user, decisions.length, profile]);

  // Fetch data for averages and friends
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch current user profile
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUserProfile(userDoc.data() as UserProfile);
        }

        // Fetch all results for global average
        const resultsSnap = await getDocs(collection(db, "results"));
        const allResults = resultsSnap.docs.map(d => d.data().profile as EthicalProfile);
        
        if (allResults.length > 0) {
          const avg = calculateAverage(allResults);
          setGlobalAverage(avg);
        }

        // Fetch all users for friend management
        const usersSnap = await getDocs(collection(db, "users"));
        setAllUsers(usersSnap.docs.map(d => d.data() as UserProfile).filter(u => u.uid !== user.uid));

        // Fetch friends' results
        if (userDoc.exists()) {
          const friendsUids = (userDoc.data() as UserProfile).friends || [];
          if (friendsUids.length > 0) {
            const friendsResultsQuery = query(collection(db, "results"), where("uid", "in", friendsUids));
            const friendsResultsSnap = await getDocs(friendsResultsQuery);
            const friendsResults = friendsResultsSnap.docs.map(d => d.data().profile as EthicalProfile);
            if (friendsResults.length > 0) {
              setFriendsAverage(calculateAverage(friendsResults));
            }
          }
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, "results/users");
      }
    };

    fetchData();
  }, [user]);

  const calculateAverage = (profiles: EthicalProfile[]): EthicalProfile => {
    const sum = profiles.reduce((acc, p) => ({
      savingHumans: acc.savingHumans + p.savingHumans,
      savingAnimals: acc.savingAnimals + p.savingAnimals,
      savingYoung: acc.savingYoung + p.savingYoung,
      savingElderly: acc.savingElderly + p.savingElderly,
      savingHighStatus: acc.savingHighStatus + p.savingHighStatus,
      savingLowStatus: acc.savingLowStatus + p.savingLowStatus,
      savingMale: acc.savingMale + p.savingMale,
      savingFemale: acc.savingFemale + p.savingFemale,
      savingFriends: acc.savingFriends + (p.savingFriends || 0),
      followingLaw: acc.followingLaw + p.followingLaw,
    }), {
      savingHumans: 0, savingAnimals: 0, savingYoung: 0, savingElderly: 0,
      savingHighStatus: 0, savingLowStatus: 0, savingMale: 0, savingFemale: 0, 
      savingFriends: 0, followingLaw: 0
    });

    const count = profiles.length;
    return {
      savingHumans: sum.savingHumans / count,
      savingAnimals: sum.savingAnimals / count,
      savingYoung: sum.savingYoung / count,
      savingElderly: sum.savingElderly / count,
      savingHighStatus: sum.savingHighStatus / count,
      savingLowStatus: sum.savingLowStatus / count,
      savingMale: sum.savingMale / count,
      savingFemale: sum.savingFemale / count,
      savingFriends: sum.savingFriends / count,
      followingLaw: sum.followingLaw / count,
    };
  };

  const handleAddFriend = async (friendUid: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        friends: arrayUnion(friendUid)
      });
      // Update local state
      setCurrentUserProfile(prev => prev ? { ...prev, friends: [...prev.friends, friendUid] } : null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  if (decisions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🤔</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Nenhum dado encontrado</h2>
        <p className="text-zinc-500 mb-8">Você precisa completar o julgamento para ver seu perfil.</p>
        <Link 
          to="/judge" 
          className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all"
        >
          Começar Julgamento
        </Link>
      </div>
    );
  }

  const chartData = [
    { subject: "Humanos", Você: profile.savingHumans, Global: globalAverage?.savingHumans || 0, Amigos: friendsAverage?.savingHumans || 0 },
    { subject: "Animais", Você: profile.savingAnimals, Global: globalAverage?.savingAnimals || 0, Amigos: friendsAverage?.savingAnimals || 0 },
    { subject: "Jovens", Você: profile.savingYoung, Global: globalAverage?.savingYoung || 0, Amigos: friendsAverage?.savingYoung || 0 },
    { subject: "Idosos", Você: profile.savingElderly, Global: globalAverage?.savingElderly || 0, Amigos: friendsAverage?.savingElderly || 0 },
    { subject: "Status Alto", Você: profile.savingHighStatus, Global: globalAverage?.savingHighStatus || 0, Amigos: friendsAverage?.savingHighStatus || 0 },
    { subject: "Status Baixo", Você: profile.savingLowStatus, Global: globalAverage?.savingLowStatus || 0, Amigos: friendsAverage?.savingLowStatus || 0 },
  ].map(item => ({
    ...item,
    Você: Math.min((item.Você / 15) * 100, 100),
    Global: Math.min((item.Global / 15) * 100, 100),
    Amigos: Math.min((item.Amigos / 15) * 100, 100),
  }));

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 tracking-tighter">Seu Perfil Ético</h1>
        <p className="text-zinc-400 text-lg">Análise comparativa baseada em {decisions.length} decisões.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
        {/* Radar Chart Container */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-[2rem] p-8 aspect-square flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="w-full h-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#999", fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Você"
                  dataKey="Você"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.4}
                />
                {globalAverage && (
                  <Radar
                    name="Média Global"
                    dataKey="Global"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                  />
                )}
                {friendsAverage && (
                  <Radar
                    name="Média Amigos"
                    dataKey="Amigos"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.2}
                  />
                )}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Detailed Analysis */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="glass p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold mb-6 text-purple-400 uppercase tracking-widest text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" /> Comparação Global
            </h3>
            <div className="space-y-6">
              <TrendItem 
                label="Preferência de Gênero" 
                value={profile.savingFemale > profile.savingMale ? "Feminino" : profile.savingMale > profile.savingFemale ? "Masculino" : "Neutro"} 
                percentage={Math.max(profile.savingFemale, profile.savingMale) * 12}
                globalValue={globalAverage ? (globalAverage.savingFemale > globalAverage.savingMale ? "Feminino" : "Masculino") : undefined}
              />
              <TrendItem 
                label="Respeito à Lei" 
                value={profile.followingLaw > 4 ? "Legalista" : "Utilitarista"} 
                percentage={profile.followingLaw * 12.5}
                globalValue={globalAverage ? (globalAverage.followingLaw > 4 ? "Legalista" : "Utilitarista") : undefined}
              />
              <TrendItem 
                label="Proteção de Espécies" 
                value={profile.savingHumans > profile.savingAnimals ? "Antropocêntrico" : "Biocêntrico"} 
                percentage={profile.savingHumans * 8}
                globalValue={globalAverage ? (globalAverage.savingHumans > globalAverage.savingAnimals ? "Antropocêntrico" : "Biocêntrico") : undefined}
              />
              <TrendItem 
                label="Lealdade a Amigos" 
                value={profile.savingFriends > 0 ? "Leal" : "Imparcial"} 
                percentage={profile.savingFriends * 25}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/judge"
              onClick={() => useGameStore.getState().resetGame()}
              className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-center rounded-2xl font-bold transition-all"
            >
              REFAZER TESTE
            </Link>
            <button
              onClick={() => window.print()}
              className="px-6 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold transition-all"
            >
              SALVAR PDF
            </button>
          </div>
        </motion.div>
      </div>

      {/* Friends Section */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass p-8 rounded-[2rem]"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Users className="text-purple-500" /> Comunidade e Amigos
            </h3>
            <p className="text-zinc-500 text-sm">Adicione amigos para comparar seus perfis éticos.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allUsers.map((u) => (
              <div key={u.uid} className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-3">
                  {u.photoURL ? (
                    <img src={u.photoURL} alt={u.displayName} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-purple-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{u.displayName}</p>
                    <p className="text-xs text-zinc-500">{u.email}</p>
                  </div>
                </div>
                
                {currentUserProfile?.friends.includes(u.uid) ? (
                  <div className="bg-green-500/10 text-green-400 p-2 rounded-lg" title="Amigo">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddFriend(u.uid)}
                    className="p-2 bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white rounded-lg transition-all"
                    title="Adicionar Amigo"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function TrendItem({ label, value, percentage, globalValue }: { label: string, value: string, percentage: number, globalValue?: string }) {
  return (
    <div className="group">
      <div className="flex justify-between text-sm mb-2">
        <div className="flex flex-col">
          <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">{label}</span>
          {globalValue && (
            <span className="text-[10px] text-blue-400 uppercase tracking-tighter">Global: {globalValue}</span>
          )}
        </div>
        <span className="text-white font-bold">{value}</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-purple-600 to-purple-400" 
        />
      </div>
    </div>
  );
}

