import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { PageTransition, fadeInUp, staggerContainer } from "@/components/animations/PageTransition";
import { useAuthStore } from "@/lib/store";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const success = login(email, password);
    setLoading(false);
    if (success) {
      toast.success("Connexion réussie !");
      navigate("/dashboard");
    } else {
      toast.error("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(245, 75%, 64%) 0%, transparent 70%)" }} />

      <PageTransition>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full max-w-md"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-foreground font-bold">Cloud Library</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Bon retour !</h1>
            <p className="text-sm text-muted-foreground mt-1">Connectez-vous à votre compte</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@cloudlibrary.com"
                    className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                    required
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full btn-glow py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                ) : (
                  <>Se connecter <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/30 text-center">
              <p className="text-xs text-muted-foreground">
                Comptes de test : <span className="text-foreground">admin@cloudlibrary.com</span> · <span className="text-foreground">sophie@example.com</span> · <span className="text-foreground">marie@example.com</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">(mot de passe quelconque)</p>
            </div>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-center text-sm text-muted-foreground mt-6">
            Pas de compte ?{" "}
            <Link to="/inscription" className="text-primary hover:underline">S'inscrire</Link>
          </motion.p>
        </motion.div>
      </PageTransition>
    </div>
  );
};

export default LoginPage;
