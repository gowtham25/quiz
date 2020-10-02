import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Home from './components/Home/Home';
import QuestionList from './components/QuestionList/QuestionList';
import QuizHistory from './components/QuizHistory/QuizHistory';

const AppContainer = styled.div`
  .title {
    background-color: #222;
    padding: 20px;
    color: #fff;
    text-align: center;
    margin: 0;
    margin-bottom: 81px;
  }
  @media screen and (max-width: 1024px) {
    .title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 700px) {
    .title {
      margin-bottom: 15px;
    }
  }
`;

export interface QueryStringProps {
  category?: string;
  difficulty?: string;
  type?: string;
}

export interface QuestionProps {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: any;
  question: string;
  type: string;
  selectedAnswer?: string;
  allOptions: any;
}

function App() {
  const [quizQuestions, setQuizQuestions] = useState<QuestionProps[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentConfiguration, setCurrentConfiguration] = useState({});

  const handleStartQuiz = (data: QueryStringProps) => {
    setLoading(true);
    setCurrentConfiguration(data);
    axios
      .get(`https://opentdb.com/api.php${obj2QueryString(data)}`)
      .then(res => res.data)
      .then(data => {
        const { results = [] } = data || {};
        const addedKey =
          results &&
          results?.length > 0 &&
          results.map((rVal: any) => ({
            ...rVal,
            selectedAnswer: '',
            question: new DOMParser().parseFromString(
              rVal.question,
              'text/html'
            ).body.innerHTML
          }));
        setQuizQuestions(addedKey);
        setLoading(false);
      });
  };
  const obj2QueryString = (obj: any) => {
    //convert object to querystring
    const str: any = [];
    Object.keys(obj).map(k =>
      str.push(`${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    );
    return `?${str.join('&')}`;
  };

  const handleRestart = () => {
    setQuizQuestions([]);
    handleStartQuiz(currentConfiguration);
  };
  const handleClickHome = () => {
    setQuizQuestions([]);
    setCurrentConfiguration({});
  };
  return (
    <AppContainer className="App">
      <h2 className="title">React Quiz</h2>
      {loading && <p>Please Wait.. Loading Questions...</p>}
      {!loading && !showHistory && (
        <>
          {quizQuestions && quizQuestions.length > 0 ? (
            <QuestionList
              handleClickHome={handleClickHome}
              quizQuestions={quizQuestions}
              handleRestart={handleRestart}
            />
          ) : (
            <Home
              setShowHistory={setShowHistory}
              handleStartQuiz={handleStartQuiz}
            />
          )}
        </>
      )}
      {showHistory && <QuizHistory setShowHistory={setShowHistory} />}
    </AppContainer>
  );
}

export default App;
