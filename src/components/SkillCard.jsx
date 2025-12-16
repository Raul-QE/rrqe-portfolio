import { motion } from 'framer-motion'
export default function SkillCard({ skill }) {
return (
<motion.div whileHover={{ y: -6 }} className="bg-gray-800 px-4 py-2 rounded-lg text-sm">{skill.name}</motion.div>
)
}