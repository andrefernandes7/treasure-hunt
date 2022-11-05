import React, { useEffect, useState } from 'react'
import './App.css';
import NextQRCode from './components/NextQRCode.tsx';
import QuestionForm from './components/QuestionForm.tsx';
import data from './mocks/data.json';

interface IQuestion{
  question: string,
  answers: string[],
  counter: number
}

function App() {
  const [answered, setAnswered] = useState(false)
  const [welcome, setWelcome] = useState(localStorage.getItem('welcome'))
  const [scan, setScan] = useState(false)
  const hashs = ["elevator-glasses", "fuel-wakeup", "fish-down", "ideas-sun", "rest-restroom"]
  const [qrcodeQuestion, setQrcodeQuestion] = useState<IQuestion>({question: '', answers: [], counter: 0})
  const haveWinner = false
  
  const handleContinue = () => {
    localStorage.setItem("welcome", 'true')
    setWelcome(true)
  }

  useEffect(()=>{
    if(!localStorage.getItem('qrcodes')){
      let array = [true, true, true, true, true]
      localStorage.setItem("qrcodes", JSON.stringify(array))
    }
    hashs.map((h, i) => {
      if(window.location.href.includes('?qr='+h)){
        setScan(true)
        setQrcodeQuestion(data.questions[i])
        let qr = JSON.parse(localStorage.getItem('qrcodes'))
        if(qr[i]){
          setAnswered(true)
        }
        return true
      }
    })
  },[])

  return (
    <div className="body">
      {!haveWinner ?
      <>
      {!scan ? (
        <div className="container withoutScan">
          <h1>Parece que você <span>não scanneou</span> nenhum <span>QRCode</span>.</h1>
        </div>
      ):(
      <div className="container">
      {!welcome ? (
        <div className='welcome'>
          <h1>Bem-vindo!</h1>
          <p>Agora você está participando do desafio do <span>hackfaesa 11.0</span>.</p>
          <p>Clique em <q>continuar</q> para começar.</p>
          <button onClick={()=>{handleContinue()}}>Continuar</button>
        </div>
      ):(
        <>
        {!answered ? (
          <QuestionForm setAnswered={setAnswered} question={qrcodeQuestion} />
          ):(
            <NextQRCode tips={data.tips} answered={answered} />
          )}
        </>
      )}
      </div>)}
      </>
      :(
        <div className="container">
          <h1 style={{textAlign: 'center'}}><span style={{color: 'var(--secondary)'}}>Alguém</span> já <br /> completou o <span style={{color: 'var(--secondary)'}}>desafio</span>.</h1>
        </div>
      )}
      
    </div>
  );
}

export default App;
