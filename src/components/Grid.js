import React from 'react'
import Row from './Row'

export default function Grid({guesses, currentGuess, turn}) {
  return (
    <div>
        {guesses.map((g, i) => {  //mapping through the guesses and outputting a row for each guess
            if (turn === i) {
                return <Row key={i} currentGuess={currentGuess} />
            }
            return <Row key={i} guess={g} />
        })}
    </div>
  )
}
