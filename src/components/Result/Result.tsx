import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionProps } from '../../App';

const ResultContainer = styled.div`
    .result-container {
        .row{
            display: flex;
            flex-direction: revert;
            justify-content: center;
            font-size: 20px;
        }
    }
    .percent {
        font-size: 17px;
        font-weight: 700;
        padding: 26px;
    }
`;

interface IResultProps {
    allQuestions: QuestionProps[];
}
const Result: React.FC<IResultProps> = ({ allQuestions }) => {
    const [correctAnswer, setCorrectAnswer] = useState<number>(0);
    useEffect(() => {
        const answer = allQuestions.filter((aVal: any) => {
            const { correct_answer, selectedAnswer } = aVal || {};
            return correct_answer === selectedAnswer;
        });
        setCorrectAnswer(answer.length);
        let history = localStorage.getItem('quizHistory');
        const percent = ((answer.length / allQuestions.length) * 100).toFixed(2);
        if (history) {
            let parseJson = JSON.parse(history);
            parseJson = [...parseJson, {
                date: getTodayDate(),
                totalQuestions: allQuestions.length,
                correct: answer.length,
                inCorrect: allQuestions.length - answer.length,
                percent
            }];
            localStorage.setItem('quizHistory', JSON.stringify(parseJson));
        } else {
            const stringJson = [{
                date: getTodayDate(),
                totalQuestions: allQuestions.length,
                correct: answer.length,
                inCorrect: allQuestions.length - answer.length,
                percent
            }]
            localStorage.setItem('quizHistory', JSON.stringify(stringJson));
        }
    }, [allQuestions]);

    const getTodayDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return dd + '-' + mm + '-' + yyyy;
    }
    return (
        <ResultContainer>
            <h2>Result</h2>
            <div className='result-container'>
                <div className='row'>
                    <div className='row-label'>Correct Answer: </div><div className='row-value'>{correctAnswer}</div>
                </div>
                <div className='row'>
                    <div className='row-label'>InCorrect Answer: </div><div className='row-value'>{allQuestions.length - correctAnswer}</div>
                </div>
            </div>
            <div className='percent'>{((correctAnswer / allQuestions.length) * 100).toFixed(2)}% of Questions are Correct</div>
        </ResultContainer>
    )
}

export default Result;