const Avatar = ({ authorName, size = 6}: { authorName: string; size?: number}) => {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-slate-900 w-${size} h-${size}`}>
            <span className={`text-gray-600 dark:text-gray-300 text-sm`}>{authorName.split(' ').map((c, i) => i < 2 && <>{c.slice(0, 1)}</>)}</span>
        </div>
    )
}
export default Avatar