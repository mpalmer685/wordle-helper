import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import {
  useDispatch as useBaseDispatch,
  useSelector as useBaseSelector,
} from 'react-redux'
import guesses from './guesses'
import helpMode from './helpMode'

export const store = configureStore({
  reducer: {
    guesses,
    helpMode,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useBaseDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<AppState> = useBaseSelector
