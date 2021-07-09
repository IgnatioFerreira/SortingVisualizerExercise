import React from 'react'
import './SortingVisualizer.css';
import { getMergeSortAnimations, bubbleSortAnimations } from "../SortingAlgorithms/sortingAlgorithms.js";

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 370;
const PRIMARY_COLOR = 'rgba(212, 0, 255, 0.5)';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 675));
        }
        this.setState({ array });
    }


    mergeSort() {
        const arrayBars = document.getElementsByClassName('array-bar');
        const barLengths = [];
        for (let index = 0; index < arrayBars.length; index++) {
            barLengths.push(document.getElementById(`${index}`).offsetHeight);
            
        }
        const animations = getMergeSortAnimations(barLengths);
        for (let i = 0; i < animations.length; i++) {
            // const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() { }
    heapSort() { }
    bubbleSort() {
        
    }
    resetArrayAnimation() {
        const animations = [];

        const arrayBars = document.getElementsByClassName('array-bar');
        const array = [];
        for (let i = 0; i < arrayBars.length; i++) {
            const value = randomIntFromInterval(5, 675);
            array.push(value);
            setTimeout(() => {
                const bar = arrayBars[i].style;
                bar.height = `${value}px`;

            }, i * ANIMATION_SPEED_MS * 2);
        }


        //TODO randomize the elements that are already present
        // for(let i = 0; i < animations.length; i++){

        // }

    }

    testSort() {
        for (let i = 0; i < 1; i++) {
            const array = [];
            for (let k = 0; k < NUMBER_OF_ARRAY_BARS; k++) {
                array.push(randomIntFromInterval(5, 675));
            }
            let sort = bubbleSortAnimations(array);
            console.log(sort);
        }
    }

    render() {
        const { array } = this.state;

        return (
            <div className="body">
                <div className="navbar">
                    <div id="buttons">
                        <button id="generate" onClick={() => this.resetArrayAnimation()}>Generate New Array</button>
                        <button onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button onClick={() => this.quickSort()}>Quick Sort</button>
                        <button onClick={() => this.heapSort()}>Heap Sort</button>
                        <button onClick={() => this.resetArrayAnimation()}>Bubble Sort</button>
                        <button onClick={() => this.testSort()}> Test</button>
                    </div>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            id={idx}
                            key={idx}
                            style={{
                                height: `${value}px`
                            }}

                        ></div>
                    ))}
                </div>
            </div>

        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//TODO disable generate new array button while sorting