import type { AnyAction, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import times from 'lodash/times'
import type { Guess, GuessResult } from '../types'
import type { AppState } from './index'

export interface GuessesState {
  currentGuess: string
  submittedGuesses: Guess[]
}

const initialState: GuessesState = {
  currentGuess: '',
  submittedGuesses: [],
}

const guessesSlice = createSlice({
  name: 'guesses',
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<string>) => {
      if (state.currentGuess.length < 5) {
        state.currentGuess += action.payload
      }
    },
    deleteLetter: (state) => {
      state.currentGuess = state.currentGuess.slice(0, -1)
    },
    createGuess: (state, action: PayloadAction<string>) => {
      state.submittedGuesses.push({
        word: action.payload,
        results: times(6, () => 'absent'),
      })
      state.currentGuess = ''
    },

    changeResult: (
      state,
      action: PayloadAction<{ guess: number; letter: number }>
    ) => {
      const { guess: guessIndex, letter: letterIndex } = action.payload
      if (
        guessIndex < 0 ||
        guessIndex >= state.submittedGuesses.length ||
        letterIndex < 0 ||
        letterIndex >= 5
      ) {
        return
      }
      const guess = state.submittedGuesses[guessIndex]
      guess.results[letterIndex] = getNextResult(guess.results[letterIndex])
    },
  },
})

function getNextResult(result: GuessResult): GuessResult {
  switch (result) {
    case 'absent':
      return 'present'
    case 'present':
      return 'correct'
    case 'correct':
      return 'absent'
    default:
      throw new Error(`Unknown result type "${result}"`)
  }
}

const { addLetter, deleteLetter, createGuess, changeResult } =
  guessesSlice.actions

function submitGuess(): ThunkAction<void, AppState, unknown, AnyAction> {
  return (dispatch, getState) => {
    const { currentGuess } = getState().guesses
    if (currentGuess.length === 5) {
      dispatch(createGuess(currentGuess))
    }
  }
}

export default guessesSlice.reducer
export { addLetter, deleteLetter, submitGuess, changeResult }
