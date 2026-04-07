import { useState } from "react";
import { signInWithGoogle } from "../lib/firebase";
import { LogIn } from "lucide-react";
import { motion } from "motion/react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 rounded-2xl max-w-md w-full"
      >
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <LogIn className="text-purple-500 w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Bem-vindo</h1>
        <p className="text-zinc-400 mb-8">
          Entre com sua conta Google para salvar seus resultados e ver a média dos seus amigos.
        </p>
        
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" referrerPolicy="no-referrer" />
          {loading ? "Entrando..." : "Entrar com Google"}
        </button>
      </motion.div>
    </div>
  );
}
