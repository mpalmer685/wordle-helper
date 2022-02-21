import { createSlice } from '@reduxjs/toolkit'
import { createGuess } from './guesses'

export type HelpMode = 'wordList' | 'keyboard'

const initialState = (): HelpMode => 'wordList'

const helpModeSlice = createSlice({
  name: 'helpMode',
  initialState,
  reducers: {
    showKeyboard: (): HelpMode => 'keyboard',
    showWordList: (): HelpMode => 'wordList',
  },
  extraReducers: (builder) =>
    builder.addCase(createGuess, (): HelpMode => 'wordList'),
})

export const { showKeyboard, showWordList } = helpModeSlice.actions
export default helpModeSlice.reducer
