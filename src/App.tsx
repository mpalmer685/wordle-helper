import React from 'react'
import { GuessList } from './components/GuessList'
import { Header } from 'components/Header'
import { HelperInput } from 'components/HelperInput'

function App() {
  return (
    <div className="flex h-full flex-col items-center">
      <Header />
      <GuessList />
      <HelperInput />
    </div>
  )
}

export default App
