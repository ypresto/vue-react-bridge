import React from 'react'

export function ReactInput({
  value,
  onChange,
  ...props
}: {
  value: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
  style: React.CSSProperties
}) {
  return <input {...props} value={value} onChange={onChange} />
}
