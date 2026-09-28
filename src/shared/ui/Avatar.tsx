const COLORS = ['#3d8bff', '#8f4bff', '#ff6b8a', '#ff9f43', '#1dbf8e', '#00a8d6']

const colorFor = (key: string): string => {
  let hash = 0
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return COLORS[hash % COLORS.length]
}

const initials = (title: string): string => {
  const letters = title
    .split(/\s+/)
    .filter((word) => /\p{L}/u.test(word[0] ?? ''))
    .map((word) => word[0])
    .join('')
  return (letters.slice(0, 2) || '#').toUpperCase()
}

interface AvatarProps {
  id: string
  title: string
}

export const Avatar = ({ id, title }: AvatarProps) => {
  return (
    <span className="avatar" style={{ background: colorFor(id) }} aria-hidden="true">
      {initials(title)}
    </span>
  )
}
