import { useSuggestedWords } from 'lib/useSuggestedWords'
import { useDispatch } from 'store'
import { createGuess } from 'store/guesses'
import { showKeyboard } from 'store/helpMode'

export function SuggestionList() {
  const dispatch = useDispatch()
  const suggestions = useSuggestedWords().slice(0, 9)

  return (
    <div className="flex h-full flex-col items-center p-2 text-center">
      <p className="text-sm text-gray-600">
        Select a word from the suggestions below
      </p>
      <ul className="grid flex-1 grid-cols-3 gap-2" style={{ maxWidth: 350 }}>
        {suggestions.map((word) => (
          <li key={word}>
            <button
              className="h-full px-4 font-mono uppercase tracking-widest"
              onClick={() => dispatch(createGuess(word))}
            >
              {word}
            </button>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-600">or</p>
      <button
        className="self-center rounded bg-green-500 py-2 px-4 text-white"
        onClick={() => dispatch(showKeyboard())}
      >
        type your own
      </button>
    </div>
  )
}
