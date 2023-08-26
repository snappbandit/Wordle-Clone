import React from 'react'

export default function Modal({ isCorrect, turn, solution}) {
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You guessed it !!! *Pats Head*</h1>
                <p className='solution'>{solution}</p>
                <p>It took you {turn} turns to guess correctly, Sensational</p>
            </div>
        )}

        {!isCorrect && (
            <div>
                <h1>Ah snap, you are out of turns :( </h1>
                <p className='solution'>{solution}</p>
                <p>Reload to try again with a different word</p>
            </div>
        )}
    </div>
  )
}
