import React from "react";
import "./SortingVisualizer.css";
import {
  getMergeSortAnimations,
  bubbleSortAnimations,
} from "../SortingAlgorithms/sortingAlgorithms.js";

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 25;
const PRIMARY_COLOR = "#f49f1c";
const SECONDARY_COLOR = "f49f1c";
//TODO use quickmath to set the sorted time accoring to the blabla so that it is alway a constant maybe 5 secs

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

  getCurrentLengths() {
    const arrayBars = document.getElementsByClassName("array-bar");
    const bars = [];
    for (let index = 0; index < arrayBars.length; index++) {
      bars.push(document.getElementById(`${index}`).offsetHeight);
    }
    return bars;
  }

  mergeSort() {
    const mergespeed = 10;
    const animations = getMergeSortAnimations(this.getCurrentLengths());
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS * mergespeed) ;
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS * mergespeed);
      }
    }
  }

  quickSort() {}
  heapSort() {}
  bubbleSort() {
    const animations = [];
    let bars = this.getCurrentLengths();

    let i, j, temp, swapped;
    for (i = 0; i < bars.length; i++) {
      swapped = false;
      for (j = 0; j < bars.length - i - 1; j++) {
        if (bars[j] > bars[j + 1]) {
          temp = bars[j];
          bars[j] = bars[j + 1];
          bars[j + 1] = temp;
          swapped = true;
          animations.push([j, j + 1, true]);
          animations.push([j, j + 1, true]);
        }
        animations.push([j, j + 1, false]);
        animations.push([j, j + 1, false]);
      }
      if (!swapped) {
        break;
      }
    }

    // console.log(animations);

    for (let i = 0; i < animations.length; i++) {
      const bubblespeed = 50;

      let bar1 = document.getElementById(`${animations[i][0]}`).style;
      let bar2 = document.getElementById(`${animations[i][1]}`).style;

      const colorswap = i % 2 === 0;
      setTimeout(() => {
        if (animations[i][2] && colorswap) {
          let temp = bar1.height;
          bar1.height = bar2.height;
          bar2.height = temp;
          bar1.backgroundColor = SECONDARY_COLOR;
          bar2.backgroundColor = SECONDARY_COLOR;
        } else if ((!animations[i][2]) && colorswap) {
          bar1.backgroundColor = "green";
          bar2.backgroundColor = "green";
        } else {
          bar1.backgroundColor = PRIMARY_COLOR;
          bar2.backgroundColor = PRIMARY_COLOR;
        }
      }, i * ANIMATION_SPEED_MS * bubblespeed);
    }
  }
  resetArrayAnimation() {
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      const value = randomIntFromInterval(5, 675);
      setTimeout(() => {
        const bar = arrayBars[i].style;
        bar.height = `${value}px`;
      }, i * ANIMATION_SPEED_MS * 10);
    }

    //TODO randomize the elements that are already present
    // for(let i = 0; i < animations.length; i++){

    // }
  }

  testSort() {
    console.log("alalalla");
    for (let i = 0; i < 20; i++) {
      let bar1 = document.getElementById(Math.floor(i / 2)).style;
      setTimeout(() => {
        if (i % 2 === 0) {
          bar1.backgroundColor = SECONDARY_COLOR;
        } else {
          bar1.backgroundColor = "blue";
        }
      }, i * ANIMATION_SPEED_MS * 300);
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="body">
        <div className="navbar">
          <div id="buttons">
            <button id="generate" onClick={() => this.resetArrayAnimation()}>
              Generate New Array
            </button>
            {/* <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button> */}
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            {/* <button onClick={() => this.testSort()} id="generate"> Test</button>
            <button> Hi! This is a work in progress!</button> */}
          </div>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              id={idx}
              key={idx}
              style={{
                height: `${value}px`,
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

//   5
//  / \
// 4   6
