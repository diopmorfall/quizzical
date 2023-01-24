import React from 'react';
import OptionSelectorsStyles from './OptionSelectors.module.css';

export default function OptionSelectors(props) {
    function mapToElements(array) {
        return array.map(item => 
            <option key={item} value={item}>
                {item}
            </option>
        );
    }

    const categoriesElements = props.categories.map(field => 
        <option key={field.name} value={field.name}>
            {field.name}
        </option>
    );

    let nums = [];
    for (let i = 1; i <= 50; i++) {
        nums.push(i);
    }

    return (
        <div className={OptionSelectorsStyles['selectors']}>
            <select className={OptionSelectorsStyles['selection']} id="category-selection">
                <option value="" hidden selected>
                    Choose a category
                </option>
                {categoriesElements}
            </select>
            <select
                className={OptionSelectorsStyles['selection']}
                id="difficulty-selection"
            >
                <option value="" hidden selected>
                    Choose the difficulty
                </option>
                {mapToElements(['Easy', 'Medium', 'Hard'])}
            </select>
            <select className={OptionSelectorsStyles['selection']} id="amount-selection">
                <option value="" hidden selected>
                    Choose the number of questions
                </option>
                {mapToElements(nums)}
            </select>
        </div>
    );
}
