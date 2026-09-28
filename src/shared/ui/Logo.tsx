interface LogoProps {
  size?: number
}

export const Logo = ({ size = 32 }: LogoProps) => {
  return (
    <span className="logo" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 32 32">
        <path
          d="M9 21.5V11l7 6 7-6v10.5"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
