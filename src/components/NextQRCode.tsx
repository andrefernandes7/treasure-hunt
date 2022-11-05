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
            <p className='winnerMessage'><strong>VOCÊ COMPLETOU<br />NOSSO DESAFIO!</strong></p>
            <p className='winnerMessage'>Agora vá até algum membro da <br /> comissão, e fale a frase:</p>
            <p className='winnerMessage'><span>TROJAN INSERIDO COM SUCESSO</span></p>
        </div>
    ))
}