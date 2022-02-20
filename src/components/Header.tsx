export function Header() {
  return (
    <header className="flex h-12 w-full items-center px-4">
      <div className="flex flex-1 justify-start">Menu</div>
      <div className="flex flex-1 justify-center text-2xl font-semibold">
        Wordle Helper
      </div>
      <div className="flex flex-1 justify-end">Other Menu</div>
    </header>
  )
}
