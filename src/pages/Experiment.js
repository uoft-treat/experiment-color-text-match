import React, {useState, useEffect} from 'react';
import {withRouter}                 from "react-router-dom";
import styled                       from 'styled-components';
import {
    getFirstHalfCorrect,
    getSecondHalfCorrect,
    setFirstHalfCorrect,
    setSecondHalfCorrect
}                                   from "../storage/ResultStorage";


export const Experiment = withRouter(({history}) => {

    const options = [

        {text: "Red", colour: "#cb002a", isCorrect: true},
        {text: "Red", colour: "#1956ff", isCorrect: false},
        {text: "Red", colour: "#d8c506", isCorrect: false},
        {text: "Red", colour: "#25ea07", isCorrect: false},
        {text: "Red", colour: "#ff00d1", isCorrect: false},

        {text: "Blue", colour: "#cb002a", isCorrect: false},
        {text: "Blue", colour: "#1956ff", isCorrect: true},
        {text: "Blue", colour: "#d8c506", isCorrect: false},
        {text: "Blue", colour: "#25ea07", isCorrect: false},
        {text: "Blue", colour: "#ff00d1", isCorrect: false},

        {text: "Yellow", colour: "#cb002a", isCorrect: false},
        {text: "Yellow", colour: "#1956ff", isCorrect: false},
        {text: "Yellow", colour: "#d8c506", isCorrect: true},
        {text: "Yellow", colour: "#25ea07", isCorrect: false},
        {text: "Yellow", colour: "#ff00d1", isCorrect: false},

        {text: "Green", colour: "#cb002a", isCorrect: false},
        {text: "Green", colour: "#1956ff", isCorrect: false},
        {text: "Green", colour: "#d8c506", isCorrect: false},
        {text: "Green", colour: "#25ea07", isCorrect: true},
        {text: "Green", colour: "#ff00d1", isCorrect: false},

        {text: "Pink", colour: "#cb002a", isCorrect: false},
        {text: "Pink", colour: "#1956ff", isCorrect: false},
        {text: "Pink", colour: "#d8c506", isCorrect: false},
        {text: "Pink", colour: "#25ea07", isCorrect: false},
        {text: "Pink", colour: "#ff00d1", isCorrect: true},

    ];

    const [count, setCount]         = useState(0);
    const [timeLeft, setTimeLeft]   = useState(60);
    const [choiceSet, setChoiceSet] = useState([]);

    useEffect(() => {
        const timerRef = setInterval(() => {
            setTimeLeft(timeLeft => timeLeft - 1);
        }, 1000);

        setChoiceSet(getChoiceSet());

        return () => {
            clearInterval(timerRef);
        }
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            history.push("/results");
        }
    }, [timeLeft]);

    const _chooseRandomlyFromArr = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    const _shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j      = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const getChoiceSet = () => {
        let result         = [];
        const incorrectSet = options.filter(option => !option.isCorrect);
        const correctSet   = options.filter(option => option.isCorrect);
        for (let i = 0; i < 4; i++) {
            result.push(_chooseRandomlyFromArr(incorrectSet));
        }
        result.push(_chooseRandomlyFromArr(correctSet));
        return _shuffle(result);
    };

    const onChooseHandler = (choice) => () => {
        if (choice.isCorrect) {
            if (timeLeft > 30) {
                setFirstHalfCorrect(getFirstHalfCorrect() + 1);
            } else {
                setSecondHalfCorrect(getSecondHalfCorrect() + 1);
            }
        }
        setCount(v => v + 1);
        setChoiceSet(getChoiceSet());
    };

    return (
        <div>

            <ChoiceList>
                {choiceSet.map((choice, i) => {
                    return (
                        <Choice
                            key={i}
                            style={{color: choice.colour}}
                            onClick={onChooseHandler(choice)}
                        >
                            {choice.text}
                        </Choice>
                    )
                })}
            </ChoiceList>

            <StatusDisplay>{timeLeft} seconds left, {count} questions answered.</StatusDisplay>
        </div>
    )

});

const ChoiceList = styled.ul`
  margin: 0;
  padding: 0;
`;

const Choice = styled.li`
  width: 100%;
  list-style: none;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: bold;
  text-align: center;
  font-size: 30px;
  border-bottom: #cbced7 1px solid;
  cursor: pointer;
  &:hover {
    background-color: #e0e4ee;
  }
`;

const StatusDisplay = styled.div`
  text-align: center;
  padding: 20px;
`;
