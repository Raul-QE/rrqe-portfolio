import { motion } from "framer-motion";
import { personal } from "../data/personal";
import { useContext, useState } from "react";
import { LangContext } from "../i18n/LangContext";
import { useCopyToast } from "../hooks/useCopyToast";
import { AnimatePresence } from "framer-motion";
import AnimatedText from "../components/ui/AnimatedText";
import emailjs from "@emailjs/browser";
import CopyToast from "../components/ui/CopyToast";
import Modal from "../components/ui/Modal";

export default function Contact() {

  const { texts } = useContext(LangContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  // MODAL STATE
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  
  const { toast, showCopyToast } = useCopyToast();

  const copyToClipboard = (value, e) => {
    navigator.clipboard.writeText(value);
    showCopyToast(texts.contact.cards.copied, e);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setModalMessage(texts.contact.cards.fillAll);
      setModalOpen(true);
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_jaw2ale",
        "template_s59xvmv",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          title: "New Project Request",
        },
        "3NKCRoTVyDFEsgOu-" // PUBLIC KEY
      );

      setModalMessage(texts.contact.cards.success);
      setModalOpen(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      setModalMessage(texts.contact.cards.error);
      setModalOpen(true);
      console.error(error);
    }

    setLoading(false);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="contact"
      className="section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold mb-4">
          <AnimatedText text={texts.contact.title}/>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Email */}
            <div className="
              bg-[var(--surface)]
              border border-[var(--border)]
              p-6
              rounded-2xl
              flex justify-between items-center
            ">
              <div>
                <span className="font-semibold relative top-[6px]"><AnimatedText text={texts.contact.cards.email} /></span>{" "}
                <a href={`mailto:${personal.email}`} className="text-blue-400">
                  {personal.email}
                </a>
              </div>
              <button
                onClick={(e) => copyToClipboard(personal.email, e)}
                className="
                  px-3 py-1
                  rounded-md
                  text-sm
                  text-white
                  bg-[#2563eb]
                  hover:bg-[#1d4ed8]
                  shadow-[0_0_12px_rgba(37,99,235,0.45)]
                  transition
                "
              >
                <AnimatedText text={texts.contact.cards.copy} />
              </button>
            </div>

            {/* Phone */}
            <div className="
              bg-[var(--surface)]
              border border-[var(--border)]
              p-6
              rounded-2xl
              flex justify-between items-center
            ">
              <div>
                <span className="font-semibold relative top-[6px]"><AnimatedText text={texts.contact.cards.phone}/></span>{" "}
                <a href="tel:+51-904-655-593" className="text-blue-400">
                  +51 904655593
                </a>
              </div>
              <button
                onClick={(e) => copyToClipboard("+51904655593", e)}
                className="
                  px-3 py-1
                  rounded-md
                  text-sm
                  text-white
                  bg-[#2563eb]
                  hover:bg-[#1d4ed8]
                  shadow-[0_0_12px_rgba(37,99,235,0.45)]
                  transition
                "
              >
                <AnimatedText text={texts.contact.cards.copy}/>
              </button>
            </div>

            {/* LinkedIn */}
            <div className="
              bg-[var(--surface)]
              border border-[var(--border)]
              p-6
              rounded-2xl
              flex justify-between items-center
            ">
              <div>
                <span className="font-semibold relative top-[6px]"><AnimatedText text={texts.contact.cards.linkedin}/></span>{" "}
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400"
                >
                  <span className="relative top-[6px]"><AnimatedText text={texts.contact.pe}/></span>
                </a>
              </div>
              <button
                onClick={(e) => copyToClipboard(personal.linkedin, e)}
                className="
                  px-3 py-1
                  rounded-md
                  text-sm
                  text-white
                  bg-[#2563eb]
                  hover:bg-[#1d4ed8]
                  shadow-[0_0_12px_rgba(37,99,235,0.45)]
                  transition
                "
              >
                <AnimatedText text={texts.contact.cards.copy}/>
              </button>
            </div>

          </motion.div>

          {/* RIGHT SIDE - FORM */}
          <motion.form
            onSubmit={sendEmail}
            variants={itemVariants}
            className="
              bg-[var(--surface)]
              border border-[var(--border)]
              p-6
              rounded-2xl
              space-y-5
            "
          >
            <h3 className="text-xl font-bold mb-2">
              <AnimatedText text={texts.contact.form.writeTitle}/>
            </h3>

            <div className="relative w-full">
              {/* Label flotante con fondo */}
              <label
                className={`
                  absolute left-3 transition-all duration-300 pointer-events-none
                  ${form.name ? '-top-3 text-sm text-[#2563eb] px-1 bg-[var(--surface)]' : 'top-2 text-gray-400 px-1 bg-transparent'}
                `}
              >
                <AnimatedText text={texts.contact.form.namePlaceholder} />
              </label>

              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder=""
                className="
                  w-full
                  p-2 pt-5
                  rounded-md
                  bg-transparent
                  border border-[var(--border)]
                  text-[var(--text-primary)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#2563eb]
                "
              />
            </div>

            <div className="relative w-full">
              <label
                className={`
                  absolute left-3 transition-all duration-300 pointer-events-none
                  ${form.email ? '-top-3 text-sm text-[#2563eb] px-1 bg-[var(--surface)]' : 'top-2 text-gray-400 px-1 bg-transparent'}
                `}
              >
                <AnimatedText text={texts.contact.form.emailPlaceholder} />
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder=""
                className="
                  w-full
                  p-2 pt-5
                  rounded-md
                  bg-transparent
                  border border-[var(--border)]
                  text-[var(--text-primary)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#2563eb]
                "
              />
            </div>

            <div className="relative w-full">
              <label
                className={`
                  absolute left-3 transition-all duration-300 pointer-events-none
                  ${form.message ? '-top-3 text-sm text-[#2563eb] px-1 bg-[var(--surface)]' : 'top-2 text-gray-400 px-1 bg-transparent'}
                `}
              >
                <AnimatedText text={texts.contact.form.projectPlaceholder} />
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder=""
                className="
                  w-full
                  p-2 pt-5
                  rounded-md
                  bg-transparent
                  border border-[var(--border)]
                  text-[var(--text-primary)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#2563eb]
                  h-28
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-2
                rounded-md
                text-white
                font-semibold
                bg-[#2563eb]
                hover:bg-[#1d4ed8]
                shadow-[0_0_14px_rgba(37,99,235,0.45)]
                transition
                disabled:opacity-50
              "
            >
              <AnimatedText text={loading ? texts.contact.form.sending : texts.contact.form.send} />
            </button>

          </motion.form>

        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.visible && <CopyToast {...toast} />}
      </AnimatePresence>

      {/* Modal */}
      <Modal
        open={modalOpen}
        text={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </motion.section>
  );
}