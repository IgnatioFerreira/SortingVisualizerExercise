import React from 'react'
import './SortingVisualizer.css';
import {mergeSortAlgo} from "../SortingAlgorithms/sortingAlgorithms.js";

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
        for (let i = 0; i < 200; i++) {
            array.push(randomIntFromInterval(5, 600));
        }
        this.setState({ array });
    }

    mergeSort(){
        const sortedArray = mergeSortAlgo(this.state.array)
        this.state.array = sortedArray;
    }

    quickSort(){}
    heapSort(){}
    bubbleSort(){}
    render() {
        const { array } = this.state;

        return (
            <div className="body">
                <div className="navbar">
                    <div id="buttons">
                        <button id="generate" onClick={() => this.resetArray()}>Generate New Array</button>
                        <button onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button onClick={() => this.quickSort()}>Quick Sort</button>
                        <button onClick={() => this.heapSort()}>Heap Sort</button>
                        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    </div>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
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

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}