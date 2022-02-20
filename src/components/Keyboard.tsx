import * as React from 'react'
import cx from 'clsx'
import { useDispatch } from 'store'
import { addLetter, deleteLetter, submitGuess } from 'store/guesses'

const validKeys = 'abcdefghijklmnopqrstuvwxyz'

export function Keyboard() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.ctrlKey || event.metaKey) {
        return
      }
      const key = event.key
      if (validKeys.includes(key)) {
        dispatch(addLetter(key))
      } else if (key === 'Backspace') {
        dispatch(deleteLetter())
      } else if (key === 'Enter') {
        dispatch(submitGuess())
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [dispatch])

  return (
    <div className="mx-2 flex h-full select-none flex-col">
      <Row>
        {'qwertyuiop'.split('').map((key) => (
          <Button key={key} onClick={() => dispatch(addLetter(key))}>
            {key}
          </Button>
        ))}
      </Row>
      <Row>
        <div className="-ml-1.5 flex-1/2" />
        {'asdfghjkl'.split('').map((key) => (
          <Button key={key} onClick={() => dispatch(addLetter(key))}>
            {key}
          </Button>
        ))}
        <div className="!ml-0 flex-1/2" />
      </Row>
      <Row>
        <Button className="flex-1.5" onClick={() => dispatch(submitGuess())}>
          Enter
        </Button>
        {'zxcvbnm'.split('').map((key) => (
          <Button key={key} onClick={() => dispatch(addLetter(key))}>
            {key}
          </Button>
        ))}
        <Button className="flex-1.5" onClick={() => dispatch(deleteLetter())}>
          Del
        </Button>
      </Row>
    </div>
  )
}

type RowProps = {
  children: React.ReactNode
  className?: string
}

function Row({ children, className }: RowProps) {
  return (
    <div
      className={cx(
        className,
        'mb-2 flex w-full grow touch-manipulation space-x-1.5'
      )}
    >
      {children}
    </div>
  )
}

function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cx(
        className,
        'flex-1 cursor-pointer select-none rounded bg-gray-300 font-bold uppercase'
      )}
      {...props}
    />
  )
}
