import  { useState } from 'react'

// useWordle is a custom hook 
const useWordle = (solution) => {
    const [turn,setTrun] = useState(0) //for the number of turns user has played
    const [currentGuess, setCurrentGuess] = useState('') //updates everytime user enters a new letter
    const [guesses, setGuesses] = useState([...Array(6)]) //stores formatted guesses made by the user
    const [history, setHistory] = useState([]) //stores the guesses in a string format to check if the user doesn't repeate a guess
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) //keeps track of what keys are used  eg: {a: 'green', b: 'yellow'}

    // format a guess into an array of letter objects
    // formatted guess eg: [{key: 'a', color:'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution]  // spreads the word into array of individual letters
        
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: 'grey'}
        })

        // find any green letters
        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i] === letter.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null // if the letter is green, index cannot be matched with some other word
            }
        })

        // eg: solution: piped, guess: plant

        // find any yellow letters
        formattedGuess.forEach((letter, i) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') { // we need to make sure that if we are colouring something yellow, it has previously not been coloured green. This case is for solutions with repeating letters 
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }

    // fires when a valid guess is made and updates the history, turn, isCorrect
    const addNewGuess = (formattedGuess) => {

        if (currentGuess === solution) { // updates the isCorrect is answer is right
            setIsCorrect(true)
        } 

        setGuesses((prevGusses) => { // adds a new guess to the guesses state
            let newGuesses = [...prevGusses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prevHistory) => { // adds the made guess to the history
            return [...prevHistory, currentGuess]
        })

        setTrun((prevTurn) => {  // increments the turn after a guess is made 
            return prevTurn + 1
        })

        setUsedKeys((prevUsedKeys) => { // Updates the colour of the keys after the formatted guess is received 
            let newKeys = {...prevUsedKeys}

            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key]

                if (letter.color === 'green') {
                    newKeys[letter.key] = 'green'
                    return
                }

                if (letter.color === 'yellow' && currentColor !== 'green') { // once the colour is green, we dont want it to change the colour
                    newKeys[letter.key] = 'yellow'
                    return
                }

                if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[letter.key] = 'grey'
                    return
                }
            })
            return newKeys
        })
        // sets the current guess to an empty string so a new guess could be made
        setCurrentGuess('')
    }

    //handle key up event & track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {

        if (key === 'Enter') {  // conditions when user presses enter to submit
            // only add guess if turn is less than 5
            if (turn > 5) {
                console.log('Looks like you are out of guesses :(')
                return
            }
            // do not allow duplicate words
            if (history.includes(currentGuess)) {
                console.log('You already tried that, come up with something new :)')
                return
            }
            // check if the word is 5 chars long
            if (currentGuess.length !== 5) {
                console.log(`Add ${5 - currentGuess.length} more letters for a valid guess :()`)
                return
            }

            const formatted = formatGuess() // this fires only if the above conditions are bypassed
            addNewGuess(formatted)
        }
        
        if (key === 'Backspace') {  // Condition for pressing backspace to ddelete a letter
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return  // return is added because if backspace is pressed below conditions need not be checked
        }
        
        if (/^[A-Za-z]$/.test(key)) {  //regex is used to check if user enters only letters and not other keys on the keyboard
            if(currentGuess.length < 5) {  //to keep the length of the guess under 5 letters
                setCurrentGuess((prev) => {
                    return prev + key
                }) 
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys} //return these to use them in other components outside the hook

}

export default useWordle