import React, { useEffect, useState } from 'react'

export default function Quiz() {
    const [quiz, setQuiz] = useState('')

    const newQuestions = () => {
        fetch('/api/v1/quiz/:id', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
              },
            body: JSON.stringify('id')
        })
        .then((res) => res.json())
        .then(data => {
            setQuiz(data)
        })
    }
    useEffect(() => {
        newQuestions()
    }, [])
    
    return (
        <div>
            <h1>Hi</h1>
            {quiz}
           
        </div>
    )
}
