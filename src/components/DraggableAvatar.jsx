import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { createPortal } from "react-dom";
import { useSpring } from "framer-motion";
import meLight from "../assets/me_light.png";
import meDark from "../assets/me_dark.png";

export default function DraggableAvatar({ dark }) {
  const controls = useAnimation();
  const getSize = () => {
    if (window.innerWidth < 640) return 256; // mobile
    if (window.innerWidth < 1024) return 320; // tablet
    return 384; // desktop
  };
  const [size, setSize] = useState(getSize());
  const [position, setPosition] = useState({ top: "57%", left: "60%" });

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());

      const w = window.innerWidth;

      if (w >= 1634) {
        setPosition({ top: "57%", left: "65%" }); // desktop muy grande
      } else if (w >= 1091) {
        setPosition({ top: "57%", left: "65%" }); // desktop normal
      } else if (w >= 1024) {
        setPosition({ top: "57%", left: "67%" }); // desktop normal
      } else if (w >= 768) {
        setPosition({ top: "65%", left: "50%" }); // tablet
      } else if (w >= 640) {
        setPosition({ top: "65%", left: "50%" }); // tablet pequeño
      } else if (w >= 555) {
        setPosition({ top: "65%", left: "50%" }); // móvil grande
      } else if (w >= 535) {
        setPosition({ top: "68%", left: "50%" }); // móvil pequeño
      } else if (w >= 455) {
        setPosition({ top: "71%", left: "50%" }); // móvil pequeño
      } else if (w >= 377) {
        setPosition({ top: "75%", left: "50%" }); // móvil pequeño
      } else {
        setPosition({ top: "78%", left: "50%" }); // muy pequeño
      }
    };

    handleResize(); // ajustar al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const center = { x: 0, y: 0 };
  const [currentDark, setCurrentDark] = useState(dark);

  useEffect(() => {
    setCurrentDark(dark);
  }, [dark]);

  const handleDragEnd = (event, info) => {
    const { point } = info;
    let targetX = point.x;
    let targetY = point.y;

    if (point.x - size / 2 < 0) targetX = size / 2;
    if (point.x + size / 2 > window.innerWidth) targetX = window.innerWidth - size / 2;
    if (point.y - size / 2 < 0) targetY = size / 2;
    if (point.y + size / 2 > window.innerHeight) targetY = window.innerHeight - size / 2;

    controls.set({ x: targetX - window.innerWidth / 2, y: targetY - window.innerHeight / 2 });

    setTimeout(() => {
      controls.start({
        x: center.x,
        y: center.y,
        transition: { type: "spring", stiffness: 150, damping: 12 },
      });
    }, 2000);
  };

  return createPortal(
    <motion.div
      drag
      dragElastic={0.8}
      dragMomentum={true}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ x: 0, y: 0, scale: 1 }}
      className="absolute z-30 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl border-4 border-white/40 cursor-grab shadow-lg"
      style={{
        top: position.top,
        left: position.left,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Imagen clara */}
      <motion.img
        src={meLight}
        alt="Raul Quispe Light"
        className="object-cover w-full h-full rounded-2xl absolute top-0 left-0"
        style={{ opacity: currentDark ? 0 : 1 }}
        animate={{ opacity: currentDark ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        draggable={false}
      />

      {/* Imagen oscura */}
      <motion.img
        src={meDark}
        alt="Raul Quispe Dark"
        className="object-cover w-full h-full rounded-2xl absolute top-0 left-0"
        style={{ opacity: currentDark ? 1 : 0 }}
        animate={{ opacity: currentDark ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        draggable={false}
      />
    </motion.div>,
    document.body
  );
}