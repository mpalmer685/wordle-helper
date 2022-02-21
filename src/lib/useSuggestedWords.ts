import invariant from 'tiny-invariant'
import groupBy from 'lodash/groupBy'
import range from 'lodash/range'
import remove from 'lodash/remove'
import allWords from 'data/wordList.json'
import { useSelector } from 'store'

export function useSuggestedWords(): string[] {
  const guesses = useSelector((state) => state.guesses.submittedGuesses)
  const result = guesses.flatMap((guess) => {
    return guess.results.map((result, index) => ({
      letter: guess.word[index],
      result,
      index,
    }))
  })
  const { correct = [], present = [], absent = [] } = groupBy(result, 'result')
  const wordList = allWords.slice()
  const checkedLetters = new Set<string>()

  correct.forEach(({ letter, index }) => {
    checkedLetters.add(letter)
    remove(wordList, (word) => word[index] !== letter)
  })
  present.forEach(({ letter, index }) => {
    checkedLetters.add(letter)
    remove(wordList, (word) => !word.includes(letter) || word[index] === letter)
  })
  absent.forEach(({ letter }) => {
    if (checkedLetters.has(letter)) {
      return
    }
    checkedLetters.add(letter)
    remove(wordList, (word) => word.includes(letter))
  })

  return calculateScores(wordList).sort(byScoreDescending).map(word)
}

function calculateScores(words: string[]): Scored[] {
  const frequencies = countFrequencies(words)
  return words.map((word) => calculateScore(word, frequencies))
}

const charCodeA = 'a'.charCodeAt(0)
const charCodeZ = 'z'.charCodeAt(0)

function countFrequencies(words: string[]): LetterFrequencies {
  const frequencies = range(charCodeA, charCodeZ + 1).reduce(
    (f: { [letter: Letter]: number }, c) => {
      const letter = String.fromCharCode(c)
      invariant(isLetter(letter))
      f[letter] = 0
      return f
    },
    {}
  )

  words.forEach((word) => {
    uniqueLetters(word).forEach((letter) => {
      invariant(isLetter(letter))
      frequencies[letter] += 1
    })
  })

  return frequencies
}

function calculateScore(word: string, frequencies: LetterFrequencies): Scored {
  const score = uniqueLetters(word).reduce(
    (score, letter) => score + frequencies[letter],
    0
  )
  return { word, score }
}

function uniqueLetters(word: string): Letter[] {
  return Array.from(new Set(word).values()).filter(isLetter)
}

function byScoreDescending(a: Scored, b: Scored) {
  return b.score - a.score
}

function word(scored: Scored): string {
  return scored.word
}

type Scored = {
  word: string
  score: number
}

type Letter = string & { __brand: 'letter' }
type LetterFrequencies = { readonly [letter: Letter]: number }

function isLetter(char: string): char is Letter {
  return (
    char.length === 1 &&
    char.charCodeAt(0) >= charCodeA &&
    char.charCodeAt(0) <= charCodeZ
  )
}
