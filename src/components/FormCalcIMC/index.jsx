import React, { useState } from "react";

import styles from './FormCalcIMC.module.css';

const FormCalcIMC = () => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [classificacao, setClassificacao] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const clearErrorMessage = () => {
        setTimeout(() => {
            setErrorMessage('');
        }, 5000); // Limpa mensagem de erro depois de 5 segundos
    }


    const typingListener = (event) => {
        const key = event.key;
        // Verifica se a tecla pressionada não é um dígito numérico, ponto ou vírgula,
        // permite somente as teclas "backspace" ou "delete" para correção
        if ((key !== 'Backspace' && key !== 'Delete') && !/[\d.,]/.test(key)) { 
            // !/[\d.,]/.test(key) Expressão regular para prevenir dígitos não numéricos, ponto e vírgula.
            //função .test para testar se a constante key corresponde a espressão regular
            setErrorMessage('Digite apenas números, ponto ou vírgula');
            clearErrorMessage();
        }
    }

    
    const changePeso = (event) => {
        const input = event.target.value;
        const alteredInput = input.replace(',', '.');
        setPeso(alteredInput);
    }

    
    const changeAltura = (event) => {
        const input = event.target.value;
        const alteredInput = input.replace(',', '.');
        setAltura(alteredInput);
    }

    const classificaIMC = (imcValue) => {
        if (imcValue < 18.5) {
            return 'Abaixo do peso';
        } else if (imcValue < 24.9) {
            return 'Peso normal';
        } else if (imcValue < 29.9) {
            return 'Sobrepeso';
        } else if (imcValue < 34.9) {
            return 'Obesidade Grau I';
        } else if (imcValue < 39.9) {
            return 'Obesidade Grau II';
        } else {
            return 'Obesidade Grau III (mórbida)';
        }
    }

    const calcIMC = () => {
        const pesoFloat = parseFloat(peso);
        const alturaFloat = parseFloat(altura);

        if (!peso || !altura) {
            setErrorMessage('Preencha ambos os campos');
            clearErrorMessage();
            return;
        }

        if (isNaN(pesoFloat) || isNaN(alturaFloat) || pesoFloat <= 0 || alturaFloat <= 0) {
            setErrorMessage('Valores inválidos. Use apenas números positivos');
            clearErrorMessage();
            return;
        }

        const imcCalc = pesoFloat / (alturaFloat * alturaFloat);
        setImc(imcCalc.toFixed(1));

        const classificacaoIMC = classificaIMC(imcCalc);
        setClassificacao(classificacaoIMC);
    }



    return (
        <>
            <div className={styles.inputs}>
                <label>Digite seu peso:</label>
                <input
                    type="text"
                    value={peso}
                    onChange={changePeso}
                    onKeyUp={typingListener}
                    placeholder="(Kg)"
                />
            </div>
            <div className={styles.inputs}>
                <label>Digite sua altura:</label>
                <input
                    type="text"
                    value={altura}
                    onChange={changeAltura}
                    onKeyUp={typingListener}
                    placeholder="(m)"
                />
            </div>
            <button className={styles.button} type="button" onClick={calcIMC}>
                Calcular
            </button>
            {imc !== null && (
                <>
                    <p>IMC: {imc}</p>
                    <p>Classificação: {classificacao}</p>
                    
                </>
            )}
            {errorMessage && (
                <div style={{ color: 'red', marginTop: '5px'}}>
                    {errorMessage}
                </div>
            )}
        </>
    );
}

export default FormCalcIMC