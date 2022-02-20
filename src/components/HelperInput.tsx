import * as React from 'react'
import { Keyboard } from './Keyboard'

export function HelperInput() {
  return (
    <div style={{ maxWidth: 500, height: 200 }} className="w-full shrink-0">
      <Keyboard />
    </div>
  )
}
