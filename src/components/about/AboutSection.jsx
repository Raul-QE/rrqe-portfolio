// src/components/about/AboutSection.jsx
import { useContext, useState } from "react";
import { LangContext } from "../../i18n/LangContext";
import { personal } from "../../data/personal";
import AnimatedText from "../../components/ui/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutSection() {
  const { lang } = useContext(LangContext);
  const [showModal, setShowModal] = useState(false);
  const [viewerCert, setViewerCert] = useState(null); // cert object para ver PDF dentro del modal

  // paragraphs (mantener saltos)
  const aboutRaw = lang === "es" ? personal.about.es : personal.about.en;
  const aboutParagraphs = aboutRaw.split("\n\n");

  // certificados y educación
  const certificates = personal.certificates || [];
  // permitir que personal.education_en no exista: fallback creado automáticamente
  const eduEs = personal.education;
  const eduEn = personal.education_en ?? {
    institution: eduEs.institution,
    career: "Software Engineering",
    period: (eduEs.period || "").replace("Dic", "Dec"),
  };
  const edu = lang === "es" ? eduEs : eduEn;

  const t = {
    about: lang === "es" ? "Sobre mí" : "About Me",
    education: lang === "es" ? "Educación" : "Education",
    certificates: lang === "es" ? "Certificados" : "Certificates",
    viewMore: lang === "es" ? "Ver más" : "Show more",
    close: lang === "es" ? "Cerrar" : "Close",
    showCred: lang === "es" ? "Mostrar credencial" : "Show credential",
    viewCert: lang === "es" ? "Ver certificado" : "View certificate",
  };

  return (
    <section id="about" className="section px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* IZQUIERDA – SOBRE MI */}
        <div>
          <AnimatedText text={t.about} className="text-4xl font-bold mb-6" />

          {aboutParagraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed text-[var(--text-secondary)] mb-4"
            >
              <AnimatedText text={p} />
            </motion.p>
          ))}
        </div>

        {/* DERECHA – EDUCACION + CERTIFICADOS */}
        <div className="space-y-6">

          {/* EDUCACIÓN */}
          <div className="relative rounded-2xl borderGlow">
            <AnimatedText text={t.education} className="text-3xl font-semibold mb-4" />

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="
                bg-[var(--surface)]
                border border-[var(--border)]
                rounded-2xl
                p-6
                backdrop-blur-lg
                transition
                shadow-[0_10px_30px_rgba(var(--shadow-blue),0.15)]
                hover:shadow-[0_15px_40px_rgba(var(--shadow-blue),0.25)]
              "
            >
              <h3 className="text-xl font-bold">
                <AnimatedText text={edu.institution} />
              </h3>

              <p className="text-[var(--text-secondary)]">
                <AnimatedText text={edu.career} />
              </p>

              <p className="text-[var(--text-secondary)] text-sm opacity-80">
                <span className="whitespace-nowrap inline-block">
                  <AnimatedText text={edu.period} />
                </span>
              </p>
            </motion.div>
          </div>

          {/* CERTIFICADOS */}
          <div className="relative rounded-2xl borderGlow">
            <AnimatedText text={t.certificates} className="text-3xl font-semibold mb-4" />

            <div className="space-y-4">
              {certificates.slice(0, 3).map((cert, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="
                    bg-[var(--surface)]
                    border border-[var(--border)]
                    p-4
                    rounded-2xl
                    backdrop-blur-lg
                    transition
                    shadow-[0_8px_25px_rgba(var(--shadow-blue),0.12)]
                    hover:shadow-[0_12px_35px_rgba(var(--shadow-blue),0.22)]
                  "
                >
                  <h4 className="font-bold text-lg text-[var(--text-primary)]">{cert.title}</h4>
                  <p className="text-[var(--text-secondary)] text-sm">{cert.institution}</p>
                  <p className="text-[var(--text-secondary)] text-xs opacity-70 mt-1">{cert.issued}</p>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="
                mt-6 w-full
                py-3
                rounded-xl
                font-semibold
                text-[var(--text-primary)]
                border border-[var(--border)]
                bg-transparent
                transition
                shadow-[0_6px_20px_rgba(var(--shadow-blue),0.2)]
                hover:bg-[var(--border)]
                hover:text-white
              "
            >
              {/* evitar salto: forzar nowrap y bloque inline */}
              <span className="inline-flex whitespace-nowrap items-center justify-center w-full">
                <AnimatedText text={t.viewMore} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL – TODOS LOS CERTIFICADOS */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-[#020617]/70 backdrop-blur-md flex justify-center items-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)} // click fuera cierra
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="
                bg-[var(--surface)]
                border border-[#1e293b]
                backdrop-blur-xl
                p-6
                rounded-3xl
                shadow-[0_20px_60px_-15px_rgba(30,41,59,0.8)]
                max-w-3xl
                w-full
                max-h-[80vh]
                overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // evitar propagación para clicks dentro
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t.certificates}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="
                    text-sm px-3 py-1 rounded-md
                    bg-[#020617]
                    border border-[#1e293b]
                    text-white
                    hover:border-[#2563eb]
                    transition
                  "
                >
                  {t.close}
                </button>
              </div>

              <div className="space-y-4">
                {certificates.map((cert, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 220 }}
                    className="
                      bg-[var(--surface)]
                      border border-[#1e293b]
                      p-4
                      rounded-2xl
                      shadow-[0_8px_25px_-10px_rgba(30,41,59,0.6)]
                      hover:shadow-[0_12px_35px_-12px_rgba(37,99,235,0.6)]
                      transition flex flex-col md:flex-row md:items-center md:justify-between gap-3
                    "
                  >
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)]">{cert.title}</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{cert.institution}</p>
                      <p className="text-xs text-[var(--text-muted)]">{cert.issued}</p>
                      <p className="text-gray-500 text-xs">ID: {cert.credentialId}</p>
                    </div>

                    <div className="relative pb-12 mt-8">
                      <div className="absolute bottom-0 right-0 flex gap-3">
                        {/* Mostrar credencial */}
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              mt-4
                              px-3 py-2 rounded-lg
                              bg-[#2563eb]
                              hover:bg-[#1d4ed8]
                              text-white text-sm
                              shadow-[0_0_15px_rgba(37,99,235,0.5)]
                              transition
                              flex items-center justify-center
                              text-center
                            "
                          >
                            <AnimatedText text={t.showCred} />
                          </a>
                        )}

                        {/* Ver certificado */}
                        <button
                          onClick={() => setViewerCert(cert)}
                          className="
                            px-3 py-2 rounded-lg
                            bg-[#020617]
                            border border-[#1e293b]
                            text-slate-100
                            hover:border-[#2563eb]
                            shadow-[0_0_10px_rgba(30,41,59,0.6)]
                            transition
                          "
                        >
                          <AnimatedText text={t.viewCert} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEWER IN-MODAL (cuando el usuario pide ver certificado) */}
      <AnimatePresence>
        {viewerCert && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[110]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewerCert(null)} // click fuera cierra viewer
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 border border-white/20 backdrop-blur-2xl p-4 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold">{viewerCert.title}</h3>
                <button
                  onClick={() => setViewerCert(null)}
                  className="px-3 py-1 rounded-md bg-white/10"
                >
                  {t.close}
                </button>
              </div>

              {/* Mostrar PDF si existe certificateFile, sino abrir credentialUrl en nueva pestaña */}
              {viewerCert.certificateFile ? (
                <iframe
                  src={viewerCert.certificateFile}
                  title={viewerCert.title}
                  className="w-full h-[70vh] rounded-lg border border-white/10"
                />
              ) : viewerCert.credentialUrl ? (
                <div className="text-center py-20">
                  <p className="text-gray-300 mb-4">No hay archivo PDF local. Abriendo la credencial en otra pestaña...</p>
                  <a
                    href={viewerCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline"
                    onClick={() => setViewerCert(null)}
                  >
                    {viewerCert.credentialUrl}
                  </a>
                </div>
              ) : (
                <p className="text-gray-300">No hay certificado disponible.</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}