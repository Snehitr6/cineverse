import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="cine-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="cine-intro-content"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="cine-intro-icon"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Clapperboard size={38} />
            </motion.div>

            <h1 className="cine-intro-logo">
              CINE<span>VERSE</span>
            </h1>

            <p className="cine-intro-caption">
              STORIES WITHOUT LIMITS
            </p>

            <div className="cine-intro-progress">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
