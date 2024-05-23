import React from 'react'

export function ReactButton({
  onClick,
  children,
  ...props
}: {
  onClick: () => void
  children?: React.ReactNode
  style: React.CSSProperties
}) {
  return (
    <button {...props} onClick={() => onClick()}>
      {children}
    </button>
  )
}
