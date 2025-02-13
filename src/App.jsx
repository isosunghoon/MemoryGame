import { MemoryProvider } from "./MemoryGameLogic"
import MemoryGame from "./MemoryGame"

export default function App() {
  return (
    <>
      <h1>memory game</h1>
      <MemoryProvider>
        <MemoryGame/>
      </MemoryProvider>
    </>
  )
}