import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionProps } from '../../App';
import Result from '../Result/Result';

const QuestionListContainer = styled.div`
    .restart-container {
        width: 50%;
        margin: auto;
        text-align: right;
        display: flex;
        justify-content: space-between;
        .restart {
            background: transparent;
            border: none;
            font-size: 16px;
            color: #4444d5;
            cursor: pointer;
            margin-bottom: 8px;
            outline: none;
        }
    }
    .question-container-top {
        position: relative;
        max-width: 50%;
        margin: 0 auto;
        background: #fff;
        border-radius: 3px;
        .questionCount {
            padding: 1.5rem 2.5rem 0;
            font-size: 14px;
            text-align: left;
            padding-left: 19px;
        }
        .question-container {
            .question {
                font-size: 20px;
                text-align: left;
                padding-left: 19px;
                margin: 11px 20px 11px 0px;
            }
            .answerOptions {
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 10px 14px;
                .answerOption {
                    cursor: pointer;
                    padding: 21px 0;
                    font-size: 16px;
                    border-top: 1px solid #eee;
                    list-style: none;
                    width: 100%;
                    font-weight: 500;
                    text-align: left;
                    padding-left: 19px;
                    display: flex;
                    flex-direction: revert;
                    align-items: center;
                    text-transform: capitalize;
                    &:hover {
                        background: #eefbfe;
                    }
                    label {
                        cursor: pointer;
                    }
                    input[type='radio'] {
                        cursor: pointer;
                        margin-right: 15px;
                        bottom: 3px;
                        position: relative;
                        &:after {
                            width: 20px;
                            height: 20px;
                            border-radius: 15px;
                            top: -4px;
                            left: -1px;
                            position: relative;
                            background-color: #d1d3d1;
                            content: '';
                            display: inline-block;
                            visibility: visible;
                            border: 2px solid white;
                        }
                        &:checked:after {
                            width: 20px;
                            height: 20px;
                            border-radius: 15px;
                            top: -4px;
                            left: -1px;
                            position: relative;
                            background-color: #2f65db;
                            content: '';
                            display: inline-block;
                            visibility: visible;
                            border: 2px solid white;
                        }
                    }
                }
            }
        }
        .button-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 15px;
            button {
                padding: 15px;
                cursor: pointer;
                border: none;
                outline: none;
                font-size: 17px;
                border-radius: 10px;
            }
        }
    }
    @media screen and (max-width: 1024px) {
        .restart-container {
            width: 70%
        }
        .question-container-top {
            max-width: 70%;
            .question-container {
                .question {
                    font-size: 16px;
                }
                .answerOptions {
                    .answerOption {
                        padding: 11px 0;
                        font-size: 14px;
                    }
                }
            }
            .button-container {
                padding: 0px 25px 13px 25px;
                button {
                    padding: 6px 15px;
                }
            }
        }
    }
    @media screen and (max-width: 700px) {
        .restart-container {
            width: 100%
        }
        .question-container-top {
            max-width: 100%;
            .question-container {
                .question {
                    font-size: 12px;
                }
                .answerOptions {
                    .answerOption {
                        padding: 11px 0;
                        font-size: 10px;
                    }
                }
            }
            .button-container {
                padding: 0px 25px 6px 25px;
                button {
                    padding: 6px 15px;
                }
            }
        }
    }
`;
interface IQuizQuestionsProps {
    quizQuestions: QuestionProps[];
    handleClickHome: () => void;
    handleRestart: () => void;
}

const QuestionList: React.FC<IQuizQuestionsProps> = ({ handleRestart, quizQuestions, handleClickHome }) => {
    const [currentQuestionNo, setCurrentQuestionNo] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionProps>();
    const [allQuestions, setAllQuestions] = useState<any>([]);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    useEffect(() => {
        if (quizQuestions && quizQuestions.length) {
            const allOptionJson = quizQuestions.map((qVal, index) => {
                const { incorrect_answers = [], correct_answer } = qVal || {};
                const allAns = [...incorrect_answers];
                const randomValue = Math.floor(Math.random() * (allAns.length - 0 + 1)) + 0;
                allAns.splice(randomValue, 0, correct_answer);
                return { ...qVal, allOptions: allAns }
            });
            setAllQuestions(allOptionJson);
            setCurrentQuestion(allOptionJson[0]);
        }
    }, [quizQuestions]);

    const handleChangeQuestion = (num: number) => {
        setCurrentQuestionNo(num);
        setCurrentQuestion(allQuestions[num]);
    };

    const handleSelectAnswer = (data: string) => {
        const setAnswer = allQuestions.map((aVal: any, index: any) => {
            if (index === currentQuestionNo) {
                setCurrentQuestion({ ...aVal, selectedAnswer: data });
                return { ...aVal, selectedAnswer: data }
            }
            return aVal;
        })
        setAllQuestions(setAnswer);
    }

    const decodeValue = (data: string) => {
        return new DOMParser().parseFromString(data, "text/html").body.innerHTML;
    }
    const { question = '', selectedAnswer = '', allOptions = [] } = currentQuestion || {};

    return (
        <QuestionListContainer>
            <div className='restart-container'>
                <button className='restart' onClick={() => { handleClickHome() }}>Home</button><button className='restart' onClick={() => { handleRestart() }}>Restart Quiz</button>
            </div>
            {isSubmit ? <Result allQuestions={allQuestions} /> :
                <div className='question-container-top'>
                    <div className='questionCount'>{`Question ${currentQuestionNo + 1} of ${quizQuestions.length}`}</div>
                    <div className='question-container'>
                        <h2 className='question'>{question}</h2>
                        <ul className='answerOptions'>
                            {allOptions.map((rVal: string, index: number) => (
                                <li className={rVal === selectedAnswer ? 'active answerOption' : 'answerOption'} key={rVal} onClick={() => handleSelectAnswer(rVal)}>
                                    <input type='radio' checked={rVal === selectedAnswer} value={rVal} name={`${index}-radio`} id={`${index}-radio`} />
                                    <label htmlFor={`${index}-radio`}>{decodeValue(rVal)}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='button-container'>
                        {currentQuestionNo !== 0 && <button onClick={() => { handleChangeQuestion(currentQuestionNo - 1) }}> Previous</button>}
                        {currentQuestionNo !== (quizQuestions.length - 1) ? <button onClick={() => { handleChangeQuestion(currentQuestionNo + 1) }}>Next</button> : <button onClick={() => { setIsSubmit(true) }}>Submit</button>}
                    </div>
                </div>}
        </QuestionListContainer>
    )
}

export default QuestionList;