import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { User } from "firebase/auth";
import { logout } from "../../lib/firebase";
import { LogOut, User as UserIcon } from "lucide-react";

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Judge", path: "/judge" },
    { name: "Results", path: "/results" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Lado Esquerdo: Links de Navegação */}
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "text-purple-400 bg-purple-500/10"
                  : "text-zinc-400 hover:text-purple-300 hover:bg-purple-500/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Lado Direito: Logo e Perfil */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hidden md:block text-xl font-bold tracking-tighter uppercase">
            Moral<span className="text-purple-500">Machine</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-purple-500/50" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-purple-400" />
                  </div>
                )}
                <span className="hidden sm:inline text-sm font-medium text-zinc-300">{user.displayName}</span>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>
        
      </div>
    </nav>
  );
}
