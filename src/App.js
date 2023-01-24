import React from 'react';
import axios from 'axios';
import './index.css';
import OptionSelectors from './components/OptionSelectors/OptionSelectors';
import Button from './components/Button/Button'
import Quiz from './components/Quiz/Quiz';

export default function App() {
    //todo: useReducer
    const [isQuizStarted, setIsQuizStarted] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [selections, setSelections] = React.useState({});
    const [selectionError, setSelectionError] = React.useState(false);

    React.useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(data => {
                setCategories(data.data.trivia_categories);
            });    
    }, []);
    
    const categorySetter = document.getElementById('category-selection');
    const difficultySetter = document.getElementById('difficulty-selection');
    const questionsAmountSetter = document.getElementById('amount-selection');

    function startQuiz() {
        const selectedCategory = categories.find(category => 
            category.name === categorySetter.value
        );

        if (selectedCategory && difficultySetter.value && questionsAmountSetter.value) {
            setSelections({
                id: selectedCategory.id,
                difficulty: difficultySetter.value,
                questionsAmount: questionsAmountSetter.value,
            });

            setIsQuizStarted((prevIsQuizStarted) => !prevIsQuizStarted);
        } else {
            console.log('wrong');
            setSelectionError(true);
        }
    }

    return (
        <main>
            {isQuizStarted ? (
                <>
                    <Quiz categoryId={selections.id}
                        difficulty={selections.difficulty.toLowerCase()}
                        questionsAmount={selections.questionsAmount}
                    />
                </>
            ) : (
                <section className="home">
                    <h1>Quizzical</h1>
                    <p>Test your knowledge</p>
                    <OptionSelectors categories={categories} />
                    <Button caption="Start quiz" onClick={startQuiz} />
                    {selectionError && (
                        <p className="error">Please select all option to start the quiz</p>
                    )}
                </section>
            )}
        </main>
    );
}