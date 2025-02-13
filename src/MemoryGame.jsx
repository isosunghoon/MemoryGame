import { useGame } from "./MemoryGameLogic";
import Card from './Card'

export default function MemoryGame() {
  const { cardsData, gameState } = useGame()
  return (
    <>
      tries: {gameState.try} score: {gameState.score}
      <div className="cardContainer">
        {cardsData.map((i,idx)=><Card key={idx} num={i} solved={gameState.solvedCards.includes(i)}/>)}
      </div>
    </>
  )
}