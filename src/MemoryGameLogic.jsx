import { createContext, useContext, useReducer, useState } from "react";

const cardDataContext = createContext(null)
const gameStateContext = createContext(null)
const cardLen = 10

function gameStateReducer(gameState, action) {
  console.log(gameState)
  switch(action.type) {
    case 'unchoose':
      return {...gameState, chosedCard: -1}
    case 'choose':
      return {...gameState, chosedCard: action.num}
    case 'guess':
      if (action.isSuccess)
        return {...gameState, try: gameState.try+1, score: gameState.score+1, chosedCard: -1, solvedCards:[...gameState.solvedCards, gameState.chosedCard]}
      else return {...gameState, try: gameState.try+1, chosedCard: -1}
  }
}

function genCards() {
  let arr = []
  for (let i=0; i<cardLen; i++) arr.push(i,i)
  arr = arr.map(i => [i, Math.random()]).sort((a,b)=>a[1]-b[1]).map(i => i[0])
  return arr
}

export function MemoryProvider({ children }) {
  const [gameState, dispatchGameState] = useReducer(gameStateReducer, initialGameState) 
  const [cardsData, setCardsData] = useState(genCards())
  return (
    <gameStateContext.Provider value={[gameState, dispatchGameState]}>
    <cardDataContext.Provider value = {cardsData}>
      {children}
    </cardDataContext.Provider>
    </gameStateContext.Provider>
  )
}

export function useGame() {
  const cardsData = useContext(cardDataContext)
  const [gameState, dispatchGameState] = useContext(gameStateContext)
  return {cardsData, gameState, dispatchGameState}
}

const initialGameState = {
  try:0,
  score:0,
  chosedCard:-1,
  solvedCards: []
}