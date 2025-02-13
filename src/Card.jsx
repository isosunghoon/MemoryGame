import { useState } from "react"
import { useGame } from "./MemoryGameLogic"

export default function Card({num, solved}) {
  const [cardState, setCardState] = useState('hidden')
  const { gameState, dispatchGameState } = useGame()
  if (!solved && gameState.chosedCard == -1 && cardState != 'hidden') {
    setTimeout(()=>setCardState('hidden'), 1000)
  }
  if (solved && cardState != 'solved') setCardState('solved')
  function handleClick() {
    switch(cardState) {
      case 'hidden':
        if (gameState.chosedCard == -1) {
          dispatchGameState({type:'choose', num:num})
        } else {
          const isSuccess = gameState.chosedCard == num
          dispatchGameState({type:'guess', isSuccess: isSuccess})
        }
        setCardState('chosen')
        break
      case 'chosen':
        dispatchGameState({type:'unchoose'})
        setCardState('hidden')
        break
    }
  }
  switch (cardState) {
    case 'hidden':
      return (<div className='card hiddenCard' onClick={handleClick}>
      </div>)
    case 'chosen':
      return (<div className='card chosedCard' onClick={handleClick}>
        {num}
      </div>)
    case 'solved':
      return (<div className='card'>
        {num}
      </div>)
  }
}