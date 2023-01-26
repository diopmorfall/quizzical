import React, { useReducer } from 'react';
import axios from 'axios';
import './index.css';

import OptionSelectors from './components/OptionSelectors/OptionSelectors';
import Button from './components/Button/Button'
import Quiz from './components/Quiz/Quiz';

export default function App() {
    const defaultState = {
        isQuizStarted: false,
        categories: [],
        options: {},
        isSelectionError: false,
    };
    
    const reducer = (state, action) => {
        switch (action.type) {
            case 'START_QUIZ':
                return { ...state, isQuizStarted: true };
            case 'SET_CATEGORIES':
                return { ...state, categories: action.payload };
            case 'SET_OPTIONS':
                return { ...state, options: action.payload };
            case 'SELECTION_ERROR':
                return { ...state, isSelectionError: true };
            default:
                return state;
        }
    };
    
    const [state, dispatch] = useReducer(reducer, defaultState);

    React.useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(data => {
                dispatch({ type: 'SET_CATEGORIES', payload: data.data.trivia_categories });
            });    
    }, []);
    
    const categorySetter = document.getElementById('category-selection');
    const difficultySetter = document.getElementById('difficulty-selection');
    const questionsAmountSetter = document.getElementById('amount-selection');

    function startQuiz() {
        const selectedCategory = state.categories.find(category => 
            category.name === categorySetter.value
        );

        if (selectedCategory && difficultySetter.value && questionsAmountSetter.value) {
            dispatch({
                type: 'SET_OPTIONS',
                payload: {
                    id: selectedCategory.id,
                    difficulty: difficultySetter.value,
                    questionsAmount: questionsAmountSetter.value,
                },
            });

            dispatch({ type: 'START_QUIZ' });
        } else {
            dispatch({ type: 'SELECTION_ERROR' });
        }
    }

    return (
        <main>
            {state.isQuizStarted ? (
                <>
                    <Quiz categoryId={state.options.id}
                        difficulty={state.options.difficulty.toLowerCase()}
                        questionsAmount={state.options.questionsAmount}
                    />
                </>
            ) : (
                <section className="home">
                    <h1>Quizzical</h1>
                    <p>Test your knowledge</p>
                    <OptionSelectors categories={state.categories} />
                    <Button caption="Start quiz" onClick={startQuiz} />
                    {state.isSelectionError && 
                        <p className="error">Please select all option to start the quiz</p>
                    }
                </section>
            )}
        </main>
    );
}