import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, UserCheck, UserX } from "lucide-react";
import { PageTransition, fadeInUp, staggerContainer } from "@/components/animations/PageTransition";
import { users as initialUsers, User } from "@/lib/data";
import { toast } from "sonner";

const roleBadge = (role: string) => {
  switch (role) {
    case "ADMIN": return "bg-primary/10 text-primary";
    case "BIBLIOTHECAIRE": return "bg-amber-400/10 text-amber-400";
    default: return "bg-emerald-400/10 text-emerald-400";
  }
};

const UsersPage = () => {
  const [usersList, setUsersList] = useState<User[]>(initialUsers);

  const toggleActive = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
    toast.success("Statut mis à jour !");
  };

  return (
    <PageTransition>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
        <motion.div variants={fadeInUp}>
          <h1 className="text-2xl font-bold text-foreground">Utilisateurs</h1>
          <p className="text-sm text-muted-foreground">{usersList.length} comptes enregistrés</p>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Utilisateur</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Email</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Rôle</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Statut</th>
                  <th className="text-right px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u) => (
                  <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {u.nom.charAt(0)}
                        </div>
                        <span className="text-foreground font-medium">{u.nom}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleBadge(u.role)}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium ${u.isActive ? "text-emerald-400" : "text-destructive"}`}>
                        {u.isActive ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => toggleActive(u.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ml-auto ${
                          u.isActive ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : "bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20"
                        }`}
                      >
                        {u.isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        {u.isActive ? "Désactiver" : "Activer"}
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </PageTransition>
  );
};

export default UsersPage;
