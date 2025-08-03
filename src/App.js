//
// Homework 3
// App JavaScript source code
//
// Author: Denis Gracanin
// Author: Kyle Hong
// Version: 1.0
//
import './App.css';
import Selector from './Selector.js';
// Start implementing MUI
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { useState } from 'react';

function App() {
// MVC: model starts
  // Used in MVC controller functions to set the food/beverage title and amount in grams
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("0");
  // Checks if the food/beverage contains tuna, ...
  const target = 'Tuna'; 
  const isMatch = text.includes(target);

  /*
   * Converts temperature from one scale to another.
   * Does not convert if the scale is the same.
   * Apparently using MUI requires === to be == instead, so I changed it.
   */
  function countHarmfulSubstance() {
    let dangerousAmount = 0;

    // If name matches a hazardous food, check for harmful substance
    // Will only be able to check common hazardous foods
    // This time I should not use parse float because the amounts are so small
    // It will only show meaningful results over a longer period of time
    // Rounding would keep adding 0 to the total instead of the actual amount
    if(isMatch && amount > 0){
      // 60 micrograms of mercury per gram of tuna on average
      dangerousAmount = 0.00000060 * amount;
      console.log(0.00000060 * amount);
    }

    return dangerousAmount;
  }
// MVC: model ends

// MVC: controller starts
  // function that checks if the food/beverage product has dangerous substances
  function handleChangeText(e) {
    setText(e.target.value);
  }

  function handleChangeAmount(e) {
    setAmount(e.target.value);
  }
// MVC: controller ends

// MVC: view starts
  return (
    <Box className="App">
      {/* Change div to Box to implement MUI library*/}
      {/* Replaced Header html element with MUI Toolbar, try to copy the styling as best as possible. */}
      {/* sx was similar to css, inspected components to try to match. However, some didn't work so I approximated them. */}
      <Toolbar 
        sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '2rem', fontWeight: "bold", ml: '-1.5rem'}}
      >
        Diet Tracker
      </Toolbar>

      {/* Selector uses props to pass information */}
      <Selector
        amount={countHarmfulSubstance()}
        scale={0}
        value={""}
        onChangeText={handleChangeText}
        onChangeAmount={handleChangeAmount}
      />
    </Box>
  );
// MVC: view ends
}

export default App;
