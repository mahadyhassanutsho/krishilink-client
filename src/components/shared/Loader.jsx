// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Loader = ({ size = "sm" }) => {
  const bars = Array.from({ length: 4 });

  const sizeMap = {
    sm: "w-1 h-3 mx-0.5",
    md: "w-2 h-4 mx-1",
    lg: "w-3 h-6 mx-1.5",
    xl: "w-4 h-12 mx-2",
  };

  const barSize = sizeMap[size] || sizeMap.sm;

  return (
    <div className="flex items-center justify-center">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className={`block rounded-xl bg-primary ${barSize}`}
          animate={{
            scaleY: [1, 1.75, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.75,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
