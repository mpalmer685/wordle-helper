import * as React from 'react'
import { useSelector } from 'store'
import { Keyboard } from './Keyboard'
import { SuggestionList } from './SuggestionList'

export function HelperInput() {
  const helpMode = useSelector((state) => state.helpMode)

  return (
    <div style={{ maxWidth: 500, height: 200 }} className="w-full shrink-0">
      {helpMode === 'wordList' && <SuggestionList />}
      {helpMode === 'keyboard' && <Keyboard />}
    </div>
  )
}
