import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "semantic-ui-react";
import "./home.css";
import numberToText from "number-to-text";
import "number-to-text/converters/en-us";
import "number-to-text/converters/id";
import Header from "../../Components/Header";

export default function Home() {
  const btnList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operator = ["+", "-", "/", "*"];
  const [resultNum, setResultNum] = useState([]);
  const [resultOperator, setResultOperator] = useState(0);
  const [resultNumTwo, setResultNumTwo] = useState([]);
  const [resultFinal, setResultFinal] = useState();
  const [convert, setConvert] = useState(0);
  const [isActive, setActive] = useState(false);

  function onPressedValueBtn(item) {
    if (resultOperator === 0) {
      setResultNum((d) => [...d, item]);
    } else {
      setResultNumTwo((d) => [...d, item]);
    }
  }

  function onPressedOperator(item) {
    console.log(item);
    if (resultNum != null && resultNumTwo != null && resultFinal != null) {
      setResultNum([]);
      setResultNum([resultFinal]);
      setResultNumTwo([]);
    }
    setResultOperator(item);
  }

  function result(number1, expression, number2) {
    if (expression === "+") {
      setResultFinal(Number(number1) + Number(number2));
      setConvert(
        numberToText.convertToText(Number(number1) + Number(number2), {
          language: "id",
        })
      );
    } else if (expression === "-") {
      setResultFinal(Number(number1) - Number(number2));
      setConvert(
        numberToText.convertToText(Number(number1) - Number(number2), {
          language: "id",
        })
      );
    } else if (expression === "*") {
      setResultFinal(Number(number1) * Number(number2));
      setConvert(
        numberToText.convertToText(Number(number1) * Number(number2), {
          language: "id",
        })
      );
    } else if (expression === "/") {
      setResultFinal(Number(number1) / Number(number2));
      setConvert(
        numberToText.convertToText(Number(number1) / Number(number2), {
          language: "id",
        })
      );
    }
  }


  return (
    <>
      <Header />

      <div className="home__calculator">
        <div className="header__home">
          <h2>Calculator Test</h2>
          <Checkbox
            label="Turn On Translate Number to Indonesia"
            checked={isActive}
            onChange={() => {
              setActive(!isActive);
            }}
          />
        </div>
        <p
          style={{
            marginTop: 10,
          }}
        >
          Angka Pertama: {resultNum}
        </p>

        <p>Angka Kedua: {resultNumTwo}</p>
        <p className="home__result">{resultFinal}</p>
        {isActive == false ? (
          <p></p>
        ) : (
          <p className="home__resultConvert">({convert})</p>
        )}
        <div className="">
          {operator.map((op, index) => (
            <Button
              color="black"
              // className="btn__loop"
              onClick={() => {
                onPressedOperator(op);
              }}
              style={{
                width: "20%",
                marginLeft: 15,
              }}
              key={index}
            >
              {op}
            </Button>
          ))}
        </div>
        <div className="btn__calculator">
          {btnList.map((btn, index) => (
            <Button
              color="black"
              className="btn__loop"
              onClick={() => {
                onPressedValueBtn(btn);
              }}
              key={index}
            >
              {btn}
            </Button>
          ))}
        </div>
        <Button
          color="black"
          className="btn__result_home"
          onClick={() => {
            result(
              resultNum.join("").replace(/[ ,]+/g, ""),
              resultOperator,
              resultNumTwo.join("").replace(/[ ,]+/g, "")
            );
          }}
        >
          Hasil
        </Button>
      </div>
    </>
  );
}
