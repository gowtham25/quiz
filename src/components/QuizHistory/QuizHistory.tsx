import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const QuizHistoryContainer = styled.div`
    table {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
        td, th {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #4CAF50;
            color: white;
            text-align: center;
        }
        @media screen and (max-width: 700px) {
           th {
               font-size: 14px;
           }
        }
        tr{
            &:nth-child(even){
                background-color: #f2f2f2;
            }
            &:nth-child(odd){
                background-color: #b0a5b0;
            }
            &:hover {
                background-color: #eefbfe;
            }
        }
    }
    .back-button {
        display: flex;
        flex-direction: revert;
        justify-content: end;
        padding-left: 12px;
        padding-bottom: 14px;
        button {
            background: transparent;
            border: none;
            font-size: 16px;
            color: #4444d5;
            cursor: pointer;
            outline: none;
        }
    }
`;

interface IHistoryProps {
    date: string,
    totalQuestions: number,
    correct: number,
    inCorrect: number,
    percent: any,
    time: string
}
interface IQuizHistoryProps {
    setShowHistory: (value: boolean) => void;
}
const QuizHistory: React.FC<IQuizHistoryProps> = ({ setShowHistory }) => {
    const [historyData, setHistoryData] = useState<IHistoryProps[]>([]);

    useEffect(() => {
        const history = localStorage.getItem('quizHistory');
        if (history) {
            const parseHistory = JSON.parse(history);
            setHistoryData(parseHistory);
        }
    }, []);

    return (
        <QuizHistoryContainer>
            <div className='back-button'>
                <button onClick={() => { setShowHistory(false) }}>Back</button>
            </div>
            <h2>Quiz History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Questions</th>
                        <th>Correct Answers</th>
                        <th>Incorrect Answers</th>
                        <th>Percentage</th>
                        <th>Time Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {historyData && historyData.length > 0 ? historyData.map((hVal, index) => {
                        const { date = '', totalQuestions, correct, inCorrect, percent, time = '' } = hVal || {};
                        return (
                            <tr key={index}>
                                <td>{date}</td>
                                <td>{totalQuestions}</td>
                                <td>{correct}</td>
                                <td>{inCorrect}</td>
                                <td>{percent}%</td>
                                <td>{time}</td>
                            </tr>
                        )
                    }) : (<tr><td colSpan={5}>No Quiz History Found..</td></tr>)}
                </tbody>
            </table>

        </QuizHistoryContainer>
    )
}

export default QuizHistory;