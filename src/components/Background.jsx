import { useEffect, useRef } from "react";

export default function Background({ dark }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const enemies = useRef([]);
  const lasers = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = 100;
    const ENEMY_COUNT = 3;
    const MIN_DISTANCE = 50;
    const INITIAL_DELAY = 10000; // 10 segundos

    // Partículas normales
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 2 + 1,
    }));

    // Enemigos rojos
    enemies.current = Array.from({ length: ENEMY_COUNT }, () => {
      const side = Math.floor(Math.random() * 4);
      let x, y;
      switch (side) {
        case 0: x = Math.random() * width; y = -20; break;
        case 1: x = Math.random() * width; y = height + 20; break;
        case 2: x = -20; y = Math.random() * height; break;
        case 3: x = width + 20; y = Math.random() * height; break;
      }
      return {
        x,
        y,
        size: 4,
        speed: 2.0 + Math.random() * 1.0,
        orbitRadius: 50 + Math.random() * 50,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: 0.01 + Math.random() * 0.015,
        state: "waiting",
        waitTime: INITIAL_DELAY,
        target: { x: x, y: y }, // Inicializado en su propia posición
      };
    });

    let mouse = { x: null, y: null };
    let hasMouse = false;

    const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        hasMouse = true;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Fondo
      ctx.fillStyle = dark ? "rgba(2,6,23,0.1)" : "rgba(248,250,252,0.1)";
      ctx.fillRect(0, 0, width, height);

      // Partículas normales
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100;
          p.vx += Math.cos(angle) * force * 0.5;
          p.vy += Math.sin(angle) * force * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dark ? "#5FB4FF" : "#1E3A8A";
        ctx.fill();
      });

      // Líneas entre partículas
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = dark
              ? `rgba(95,180,255,${1 - dist / 100})`
              : `rgba(30,58,138,${1 - dist / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Enemigos rojos
      enemies.current.forEach((e) => {
        if (!hasMouse) return;
        // Reducir waitTime si está esperando
        if (e.state === "waiting") {
          e.waitTime -= 16; // aproximadamente 60fps
          if (e.waitTime <= 0) e.state = "approach";
        }

        const dxMouse = mouse.x - e.x;
        const dyMouse = mouse.y - e.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (e.state === "approach") {
          if (distMouse < e.orbitRadius) {
            e.state = "orbit";
          } else {
            e.x += (dxMouse / distMouse) * e.speed;
            e.y += (dyMouse / distMouse) * e.speed;
          }
        } else if (e.state === "orbit") {
            // mover target suavemente hacia el mouse
            e.target.x += (mouse.x - e.target.x) * 0.05;
            e.target.y += (mouse.y - e.target.y) * 0.05;

            e.orbitAngle += e.orbitSpeed;

            const orbitX =
                e.target.x + Math.cos(e.orbitAngle) * e.orbitRadius;
            const orbitY =
                e.target.y + Math.sin(e.orbitAngle) * e.orbitRadius;

            // 🔑 interpolar posición (NO teletransportar)
            e.x += (orbitX - e.x) * 0.08;
            e.y += (orbitY - e.y) * 0.08;

            // si te alejas, vuelve a perseguir
            if (distMouse > e.orbitRadius * 2.5) {
                e.state = "approach";
            }
        }

        // dibujar enemigo
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = "#FF4D4D";
        ctx.fill();

        // disparo más lento
        if (Math.random() < 0.005) {
          const dxl = mouse.x - e.x;
          const dyl = mouse.y - e.y;
          const distl = Math.sqrt(dxl * dxl + dyl * dyl);
          lasers.current.push({
            x: e.x,
            y: e.y,
            vx: (dxl / distl) * 5,
            vy: (dyl / distl) * 5,
            life: 200,
          });
        }
      });

      // Dibujar láseres
      for (let i = lasers.current.length - 1; i >= 0; i--) {
        const l = lasers.current[i];
        l.x += l.vx;
        l.y += l.vy;
        l.life--;

        ctx.beginPath();
        ctx.arc(l.x, l.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#FF0000";
        ctx.fill();

        if (l.life <= 0 || l.x < 0 || l.x > width || l.y < 0 || l.y > height) {
          lasers.current.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}