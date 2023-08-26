import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle' 
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle( {solution} ) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup) //to listen to the key press

        //game ending conditions
        if (isCorrect) { // If the guess is correct
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn > 5) { // If all the turns are over
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup) //prevents multiple key presses 
    }, [handleKeyup, isCorrect, turn])
  
    return (
    <div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        <Keypad usedKeys={usedKeys} />
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  )
}
