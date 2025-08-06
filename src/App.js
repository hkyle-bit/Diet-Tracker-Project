//
// Project
// App JavaScript source code
//
// Author: Kyle Hong
// Version: 1.0
//
import './App.css';
import Selector from './Selector.js';
import BarChart from './BarChart.tsx';
// Start implementing MUI
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
// import output.css for Tailwind usage by CDN
import './output.css';

// Limitation: Not using MongoDB, not tracking common health numbers such as fats for danger levels
function App() {
// MVC: model starts
  // Used in MVC controller functions to set the food/beverage title and amount in grams
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("0");
  const [measurement, setMeasurement] = useState("0");
  // Checks if the food/beverage contains tuna, ...
  // Will only work accurately if the food is pure or the amount given is
  // just the dangerous portion of the food/beverage
  const targetMercury = ['tuna', 'marlin', 'swordfish', 'shark'];
  const isMatchMercury = targetMercury.some(fish =>
    text.toLowerCase().includes(fish.toLowerCase())
  );
  const targetArsenic = 'rice'; 
  const isMatchArsenic = text.toLowerCase().includes(targetArsenic);
  let danger = false;

  /*
   * Returns the amount of harmful substance in a given food/beverage
   */
  function countArsenic() {
    let dangerousAmount = 0;

    // If name matches a hazardous food, check for harmful substance
    // Will only be able to check common hazardous foods
    // This time I should not use parse float because the amounts are so small
    // It will only show meaningful results over a longer period of time
    // Rounding would keep adding 0 to the total instead of the actual amount
    // Known limitations: Can only track food that has been coded for, and only 1 harmful substance at a time
    // Numbers will turn red for AVERAGE body weight
    if(isMatchArsenic && amount > 0){
      // 92 parts per billion of arsenic per gram of white rice on average
      dangerousAmount = 0.000000092 * amount;
      console.log(0.000000092 * amount);
    }

    return dangerousAmount;
  }
  
  function countMercury() {
    let mercuryAmount = 0;

    // If name matches a hazardous food, check for harmful substance
    // Will only be able to check common hazardous foods
    // This time I should not use parse float because the amounts are so small
    // It will only show meaningful results over a longer period of time
    // Rounding would keep adding 0 to the total instead of the actual amount
    // Known limitations: Can only track food that has been coded for, and only 1 harmful substance at a time
    // Numbers will turn red for AVERAGE body weight
    // Eventually need to change it so it turns red if the number is too high from MongooseDB
    
    // Safe weekly Tuna amount
    if(isMatchMercury && amount > 0 && text.toLowerCase() === targetMercury[0]){
      // 60 micrograms of mercury per gram of tuna on average
      mercuryAmount = 0.00000060 * amount;

      console.log(0.00000060 * amount);

      if(amount >= 340.19){
        danger = true;
      }
    }

    // Safe weekly Marlin amount
    if(isMatchMercury && amount > 0 && text.toLowerCase() === targetMercury[1]){
      // 152 micrograms of mercury per gram of marlin on average
      mercuryAmount = 0.00000152 * amount;

      console.log(0.00000152 * amount);

      if(amount >= 140){
        danger = true;
      }
    }

    // Safe weekly Swordfish amount
    if(isMatchMercury && amount > 0 && text.toLowerCase() === targetMercury[2]){
      // 99.5 micrograms of mercury per gram of swordfish on average
      mercuryAmount = 0.000000995 * amount;

      console.log(0.000000995 * amount);

      if(amount >= 170){
        danger = true;
      }
    }

    // Safe weekly Shark amount
    if(isMatchMercury && amount > 0 && text.toLowerCase() === targetMercury[3]){
      // 99 micrograms of mercury per gram of tuna on average
      mercuryAmount = 0.00000099 * amount;

      console.log(0.00000099 * amount);

      if(amount >= 150){
        danger = true;
      }
    }

    return mercuryAmount;
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

  function handleChangeMeasurement(e) {
    setMeasurement(e.target.value);
  }
// MVC: controller ends

// MVC: view starts
  return (
    <Box className="App" sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      {/* Change div to Box to implement MUI library*/}
      {/* Replaced Header html element with MUI Toolbar, try to copy the styling as best as possible. */}
      {/* sx was similar to css, inspected components to try to match. However, some didn't work so I approximated them. */}
      <Toolbar class="text-blue-800 text-4xl font-bold grid place-items-center h-screen"
        sx={{ 
          color: 'darkblue', 
          fontFamily: 'Times-New-Roman', 
          fontSize: '2rem', 
          fontWeight: "bold",
          textAlign: 'center',
          minHeight: 'auto',
        }}
      > 
        Diet Tracker
      </Toolbar>
      <Box class="text-blue-800 grid place-items-center h-screen">
        All measurements are in grams.
      </Box>

      {/* Selector uses props to pass information */}
      <Selector
        amountArsenic={countArsenic()}
        amountLead={countArsenic()}
        amountMercury={countMercury()}
        amountCadmium={countMercury()}
        onChangeText={handleChangeText}
        onChangeAmount={handleChangeAmount}
        onChangeMeasurement={handleChangeMeasurement}
        value={measurement}
        danger={danger}
      />
      <BarChart>
      </BarChart>
    </Box>
  );
// MVC: view ends
}

export default App;
