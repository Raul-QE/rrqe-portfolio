export default function DarkModeToggle({ dark, setDark }) {
return (
<button onClick={() => setDark(!dark)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800">
{dark ? '🌙' : '☀️'}
</button>
)
}