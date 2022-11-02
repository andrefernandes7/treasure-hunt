import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
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
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [welcome, setWelcome] = useState(cookies['welcome'])
  const [scan, setScan] = useState(false)
  const hashs = ["elevator-glasses", "fuel-wakeup", "fish-down", "ideas-sun", "rest-restroom"]
  const [qrcodeQuestion, setQrcodeQuestion] = useState<IQuestion>({question: '', answers: [], counter: 0});
  
  const handleContinue = () => {
    setCookie("welcome", "true")
    setWelcome(true)
  }

  useEffect(()=>{
    if(!cookies['qrcodes'] ){
      setCookie("qrcodes", [false, false, false, false, false])
      window.location.reload()
    }
    
    hashs.map((h, i) => {
      if(window.location.href.includes(h)){
        setScan(true)
        setQrcodeQuestion(data.questions[i])
        if(cookies['qrcodes'][i]){
          setAnswered(true)
        }
        return true
      }
    })
  },[])

  return (
    <div className="body">
      {!scan ? (
        <div className="container withoutScan">
          <h1>Parece que você <span>não scanneou</span> nenhum <span>QRCode</span>.</h1>
        </div>
      ):(<div className="container">
      {!welcome ? (
        <div className='welcome'>
          <h1>Bem-vindo</h1>
          <p>Agora você está participando do desafio do <span>hackfaesa 11.0</span>.</p>
          <p>Clique em <q>continuar</q> para começar.</p>
          <button onClick={()=>{handleContinue()}}>Continuar</button>
        </div>
      ):(
        <>
        {!answered ? (
          <QuestionForm setAnswered={setAnswered} question={qrcodeQuestion} setCookie={setCookie} cookies={cookies} />
          ):(
            <NextQRCode tips={data.tips} cookies={cookies} answered={answered} />
          )}
        </>
      )}
    </div>)}
    </div>
  );
}

export default App;
