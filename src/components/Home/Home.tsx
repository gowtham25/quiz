import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { QueryStringProps } from '../../App';
import { CATEGORY_TYPE, DIFFICULTY } from '../../constants';

const HomeContainer = styled.div`
    width: 50%;
    margin: auto;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #FFF;
        padding: 32px;
        border-radius: 10px;
        .form-row {
            display: flex;
            flex-direction: column;
            align-items: baseline;
            padding: 12px;
            label {
                span {
                    font-size: 10px;
                    color: #9c8b8b;
                }
                display: inline-block;
                max-width: 100%;
                margin-bottom: 5px;
                font-weight: bold;
            }
            select, input {
                width: 600px;
                height: 38px;
                display: block;
                padding: 8px;
                font-size: 15px;
                line-height: 1.42857143;
                color: #464545;
                background-color: #ffffff;
                background-image: none;
                border: 1px solid #CCC;
                border-radius: 4px;
                box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
                transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
            }
            input {
                width: 577px;
                height: 22px;
            }
        }
        button {
            border-width: 0px;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 16px;
            padding: 12px;
            border-radius: 10px;
            cursor: pointer;
            background: rgba(0,0,0,0.6);
            color: #FFF;
            margin-top: 19px;
            outline: none;
            &:hover {
                background: #2b282899;
            }
        }
    }
    .restart-container {
        width: 100%;
        margin: auto;
        text-align: right;
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
    @media screen and (max-width: 1024px) {
        width: 70%;
        .restart-container {
            width: 100%
        }
        form {
            padding: 20px 10px;
            .form-row {
                width: 100%;
                padding: 6px;
                select {
                    width: 100%;
                }
                input {
                    width: 97%
                }
            }
        }
    }
    @media screen and (max-width: 700px) {
        width: 100%;
        .restart-container {
            width: 100%
        }
		form {
            padding: 20px 10px;
            .form-row {
                width: 100%;
                select, input {
                    width: 100%;
                }
                input {
                    width: 97%
                }
            }
        }
    }
    
`;
const validate = (val: any) => {
    const errors: any = {};
    if (!val.amount) errors.amount = 'Required';
    if (val.amount <= 0) errors.amount = 'Valid input should be more than 1';
    if (isNaN(val.amount)) errors.amount = 'Please enter the valid input';
    return errors;
};

interface IHomeProps {
    handleStartQuiz: (data: QueryStringProps) => void;
    setShowHistory: (data: boolean) => void;
}
const Home: React.FC<IHomeProps> = ({ handleStartQuiz, setShowHistory }) => {
    return (
        <HomeContainer>
            <div className='restart-container'>
                <button className='restart' onClick={() => { setShowHistory(true) }}>Show History</button>
            </div>
            <Formik
                initialValues={{ category: '', difficulty: '', amount: 10 }}
                validate={validate}
                onSubmit={(values: any, actions) => {
                    const filterJson = { ...values }
                    Object.keys(values).map((val) => {
                        if (!filterJson[val])
                            delete filterJson[val];
                        return val;
                    })
                    handleStartQuiz(filterJson);
                }}
            >
                {({ errors }) => (
                    <Form>
                        <div className='form-row'>
                            <label>Number of Questions: </label>
                            <Field type="number" name="amount" />
                            <ErrorMessage name='amount' />
                        </div>
                        <div className='form-row'>
                            <label>Select Category: <span>(Optional)</span></label>
                            <Field as="select" name="category">
                                {CATEGORY_TYPE.map((data) => {
                                    const { label, value } = data || {};
                                    return <option key={value} value={value}>{label}</option>
                                })}
                            </Field>
                        </div>
                        <div className='form-row'>
                            <label>Select Difficulty: <span>(Optional)</span></label>
                            <Field as="select" name="difficulty">
                                {DIFFICULTY.map((data) => {
                                    const { label, value } = data || {};
                                    return <option key={value} value={value}>{label}</option>
                                })}
                            </Field>
                        </div>
                        {/* <div className='form-row'>
                            <label>Select Type: <span>(Optional)</span></label>
                            <Field as="select" name="type">
                                {QUESTION_TYPE.map((data) => {
                                    const { label, value } = data || {};
                                    return <option key={value} value={value}>{label}</option>
                                })}
                            </Field>
                        </div> */}
                        <button type="submit">Start Quiz</button>
                    </Form>
                )}
            </Formik>
        </HomeContainer>
    )
}

export default Home;