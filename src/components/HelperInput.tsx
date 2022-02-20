import * as React from 'react'
import { Keyboard } from './Keyboard'

export function HelperInput() {
  const [currentWord, setCurrentWord] = React.useState('')
  console.log(currentWord)

  return (
    <div style={{ maxWidth: 500, height: 200 }} className="w-full shrink-0">
      <Keyboard
        onAddLetter={React.useCallback((letter) => {
          setCurrentWord((word) => word + letter)
        }, [])}
        onDeleteLetter={React.useCallback(() => {
          setCurrentWord((word) => word.slice(0, -1))
        }, [])}
        onSubmitGuess={React.useCallback(() => {
          console.log('submit')
        }, [])}
      />
    </div>
  )
}
