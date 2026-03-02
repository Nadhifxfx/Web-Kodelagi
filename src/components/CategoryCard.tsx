import { motion } from "framer-motion";
import { Category } from "@/data/categories";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => navigate(`/content?category=${category.id}`)}
      className="group cursor-pointer"
    >
      <div className={`relative aspect-square rounded-xl border border-border bg-card p-6 transition-all duration-300 group-hover:glow-primary group-hover:border-primary/30 overflow-hidden`}>
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{category.icon}</span>
            <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 md:text-justify">{category.description}</p>

          {/* Code preview */}
          <div className="mt-4 rounded-lg bg-code p-3 overflow-hidden">
            <pre className="text-xs text-code-foreground font-mono leading-relaxed truncate">
              {category.codeSnippet.split("\n").slice(0, 3).join("\n")}
            </pre>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Start Challenge</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
