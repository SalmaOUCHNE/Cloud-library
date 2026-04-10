import { Category } from "@/lib/data";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <motion.div whileHover={{ scale: 1.03, y: -3 }} className="category-overlay h-40" onClick={onClick}>
      <img src={category.image} alt={category.nom} className="w-full h-full object-cover" loading="lazy" width={512} height={512} />
      <div className="absolute inset-0 z-10 p-4 flex flex-col justify-end">
        <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-primary-foreground text-sm font-bold mb-2">
          {category.initial}
        </div>
        <h3 className="font-semibold text-foreground text-sm">{category.nom}</h3>
        <p className="text-xs text-muted-foreground">{category.description}</p>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
