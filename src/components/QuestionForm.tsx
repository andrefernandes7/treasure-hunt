import React, { useState } from 'react';
import data from '../mocks/data.json';

interface IQuestion{
    question: string,
    answers: string[],
    counter: number
}

interface IQuestionForm {
    setAnswered: React.Dispatch<React.SetStateAction<boolean>>
    question: IQuestion
}

export default function QuestionForm ({setAnswered, question}:IQuestionForm) {
    const [answer, setAnswer] = useState('')
    const allData:IQuestion[] = data.questions
    const handeButtonClick = () => {
        if(answer.trim() !== ''){
            let ans = question.counter < 6 ? answer.split(' ') :  answer.split(',')
            let counter = 0
            let qa:string[] = []
            ans.map(a => {
                let str = a.toLocaleLowerCase().replace(',', ' ').trim()
                if(question.answers.includes(str) && !qa.includes(str)){
                    qa.push(str)
                    counter++
                }
            })
            if(counter >= question.counter) {
                let qrcodes = JSON.parse(localStorage.getItem("qrcodes"))
                let index = 0
                allData.map((ad, i:number) => {
                    if(ad.question.includes(question.question)){
                        index = i
                        return
                    }
                })
                qrcodes[index] = true
                localStorage.setItem('qrcodes', JSON.stringify(qrcodes))
                setAnswered(true)
            }else{
                alert('Resposta incorreta!')
            }
        }else{
            alert('Parece que você não respondeu nada')
        }
    }
    return (
        <div className='question'>
            <p>{question.question}</p>
            <input type="text" onChange={(t) => setAnswer(t.target.value)} />
            <button onClick={()=>{handeButtonClick()}}>Enviar</button>
        </div>
    )
}