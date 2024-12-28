import { useRef } from 'react'
import { useScroll } from '@react-hooks-library/core'
import { useState } from 'react'

export function Demo() {
  const box = useRef<HTMLDivElement | null>(null)
  const [scroll, setScroll] = useState({ x: 0, y: 0 })

  useScroll(box, ({ scrollX, scrollY }) =>
    setScroll({ x: scrollX, y: scrollY })
  )

  return (
    <div ref={box}>
      <div>Scroll Vertically and Horizontally</div>
      <div style={{ width: '100rem', height: '35rem' }}></div>
    </div>
  )
}