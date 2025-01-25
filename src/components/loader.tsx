import type React from "react";
import { motion } from "motion/react";

const Loader: React.FC = () => {
  const emojis = ["🚜", "🚜", "🚜", "🚜"];

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-[120px] h-[120px]">
        {emojis.map((emoji, index) => (
          <motion.div
            key={`emoji-${index + 1}`}
            className="absolute text-2xl"
            initial={{
              rotate: index * 90,
              x: 0,
              y: -50,
            }}
            animate={{
              rotate: index * 90 + 360,
              x: 0,
              y: -50,
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "linear",
            }}
            style={{
              transformOrigin: "60px 60px",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
