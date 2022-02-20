export type GuessResult = 'correct' | 'present' | 'absent'
export type Guess = { word: string; results: GuessResult[] }
