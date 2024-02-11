import React from 'react'

export function ReactButton({
  count,
  onClick,
  ...props
}: {
  count: number
  onClick: () => void
  style: React.CSSProperties
}) {
  return (
    <button {...props} onClick={() => onClick()}>
      React: count is {count}
    </button>
  )
}
