import React from 'react'

export default function Row( {guess, currentGuess}) {

    if (guess) { //if guess has a value and is not undefined
        return (
            <div className="row past">
                {guess.map((letter, i) => (
                    <div key={i} className={letter.color}>{letter.key}</div> //letter has a key and colour property 
                ))}
            </div>
        )
    }

    // Fills the boxes with the letters as they get typed
    if (currentGuess) {
        let letters = currentGuess.split('')

        return (
            <div className='row current'>
                {letters.map((letter, i) => (
                    <div key={i} className='filled'>{letter}</div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i}></div>
                ))} 
            </div>
        )   
    }

    return (
    // outputs 5 boxes in a row for 5 letters when undefined
    <div className="row"> 
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    )
}
