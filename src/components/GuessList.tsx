import * as React from 'react'
import cx from 'clsx'
import type { Guess, GuessResult } from '../types'
import { range } from '../util'

type GuessListProps = {
  guesses: Guess[]
}

export function GuessList({ guesses }: GuessListProps) {
  const container = React.useRef<HTMLDivElement>(null)
  const { width, height } = useAspectRatio(container, {
    width: 5,
    height: 6,
    maxWidth: 350,
  })

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
}

function Letter({ letter, result }: LetterProps) {
  return (
    <div
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
    >
      {letter}
    </div>
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
