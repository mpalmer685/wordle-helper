import * as React from 'react'
import cx from 'clsx'
import range from 'lodash/range'
import { useDispatch, useSelector } from 'store'
import { changeResult } from 'store/guesses'
import type { GuessResult } from '../types'

export function GuessList() {
  const dispatch = useDispatch()
  const container = React.useRef<HTMLDivElement>(null)
  const { width, height } = useAspectRatio(container, {
    width: 5,
    height: 6,
    maxWidth: 350,
  })

  const { currentGuess, submittedGuesses } = useSelector(
    (state) => state.guesses
  )

  const guesses = [...submittedGuesses, { word: currentGuess, results: [] }]

  return (
    <div
      ref={container}
      className="flex grow items-center justify-center overflow-hidden"
    >
      <div className="grid grid-rows-6 gap-1 p-2" style={{ width, height }}>
        {range(6).map((guessIndex) => {
          const { word = '', results = [] } = guesses[guessIndex] ?? {}
          return (
            <div key={guessIndex} className="grid grid-cols-5 gap-1">
              {range(5).map((letterIndex) => (
                <Letter
                  key={letterIndex}
                  letter={word[letterIndex]}
                  result={results[letterIndex]}
                  onClick={() =>
                    dispatch(
                      changeResult({ guess: guessIndex, letter: letterIndex })
                    )
                  }
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

type Size = {
  width: number
  height: number
}

type LetterProps = {
  letter: string | undefined
  result: GuessResult | undefined
  onClick: () => void
}

function Letter({ letter, result, onClick }: LetterProps) {
  return (
    <button
      className={cx(
        'inline-flex w-full select-none items-center justify-center align-middle text-3xl font-bold uppercase',
        result === 'correct' && 'bg-green-500 text-white',
        result === 'present' && 'bg-yellow-500 text-white',
        result === 'absent' && 'bg-gray-500 text-white',
        result === undefined &&
          (letter === undefined
            ? 'border-2'
            : 'border-2 border-gray-400 text-black')
      )}
      disabled={result === undefined}
      onClick={onClick}
    >
      {letter}
    </button>
  )
}

function useAspectRatio<T extends HTMLElement>(
  containerRef: React.RefObject<T>,
  { width, height, maxWidth }: Size & { maxWidth: number }
) {
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    const onResize = () => {
      const nextWidth = Math.min(
        Math.floor((container.clientHeight * width) / height),
        maxWidth
      )
      const nextHeight = Math.floor(nextWidth / width) * height
      setSize({ height: nextHeight, width: nextWidth })
    }

    onResize()

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [containerRef, width, height, maxWidth])

  return size
}
