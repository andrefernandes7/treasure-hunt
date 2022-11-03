import React, { useEffect, useState } from 'react'

interface INextQRCode {
    tips: string[]
    answered: boolean
}

export default function NextQRCode ({tips, answered}:INextQRCode) {
    const [index, setIndex] = useState(0)
    
    useEffect(()=>{
        let qrc:any[] = JSON.parse(localStorage.getItem('qrcodes'))
        let i = qrc.indexOf(false)
        setIndex(i)
    }, [answered])

    return (index > -1 ? (
        <div className="nextQuestion">
            <p>Muito bem, você respondeu corretamente a pergunta!</p>
            <p>Aqui está a dica do próximo QRCode:</p>
            <p className='tip'><q>{tips[index]}</q></p>
        </div>
    ):(
        <div className="nextQuestion">
            <h1>PARABÉNS!</h1>
            <h4>VOCÊ COMPLETOU<br />NOSSO DESAFIO!</h4>
            <br />
            <p>Agora vá até algum membro da comissão, e fale a frase: <br /><span>TROJAN INSERIDO COM SUCESSO</span></p>
        </div>
    ))
}