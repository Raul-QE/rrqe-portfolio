import { useContext } from 'react'
import { LangContext } from '../i18n/LangContext'


export default function LanguageToggle() {
const { lang, setLang } = useContext(LangContext)
return (
<div>
<button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800">
{lang === 'es' ? 'ES' : 'EN'}
</button>
</div>
)
}