interface UnreadBadgeProps {
  count: number
}

export const UnreadBadge = ({ count }: UnreadBadgeProps) => {
  if (count <= 0) return null
  return (
    <span className="badge" aria-label={`Непрочитанных: ${count}`}>
      {count}
    </span>
  )
}
