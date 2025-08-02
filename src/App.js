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
import Display from './Display.js';
// Start implementing MUI
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';

function App() {
// MVC: model starts
  const [temperatureText, setTemperatureText] = useState("");
  const [temperatureScale, setTemperatureScale] = useState("0");
  // added display scale and setDisplayScale to see if display is Celsius, Fahrenheit, Kelvin, or Rankine
  // default is Celsius (0)
  const [displayScale, setDisplayScale] = useState("0");

  /*
   * Converts temperature from one scale to another.
   * Does not convert if the scale is the same.
   * Apparently using MUI requires === to be == instead, so I changed it.
   */
  function convertTemperature() {
    let temperature = "";
    if (temperatureText.length > 0) {
      // First set of 4 is Celsius -> New Scale

      // If Display is Celsius and Convert is Fahrenheit, temperature = (9/5 * temperature) + 32
      // Convert from Celsius to Fahrenheit. If text is a number, Selector is 0 (C), and Display is 1 (F),
      // temperature = (9/5 * temperature) + 32
      if(!isNaN(temperatureText) && temperatureScale == "0" && displayScale == "1"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < -273.15){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Changed how this is written to round properly at the end of the calculation
        temperature = Number.parseFloat(9/5 * temperatureText + 32).toFixed(2);
      }

      // Convert from Celsius to Kelvin. If text is a number, Selector is 0 (C), and Display is 2 (K),
      // temperature = temperature + 273.15
      else if(!isNaN(temperatureText) && temperatureScale == "0" && displayScale == "2"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < -273.15){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Not sure why, but I have to multiply temperature by something for it to add 273.15 properly.
        // Otherwise it appends it.
        temperature = Number.parseFloat(1 * temperatureText + 273.15).toFixed(2);
      }

      // Convert from Celsius to Rankine. If text is a number, Selector is 0 (C), and Display is 3 (R),
      // temperature = 9/5 * temperature + 491.67
      else if(!isNaN(temperatureText) && temperatureScale == "0" && displayScale == "3"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < -273.15){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Not sure why, but I have to multiply temperature by something for it to add 273.15 properly.
        // Otherwise it appends it.
        temperature = Number.parseFloat(9/5 * temperatureText + 491.67).toFixed(2);
      }

      // Next set is Fahrenheit -> New Scale
  
      // Convert from Fahrenheit to Celsius. If text is a number, Selector is 1 (F), and Display is 0 (C),
      // temperature = (temperature - 32) * 5/9
      else if(!isNaN(temperatureText) && temperatureScale == "1" && displayScale == "0"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < -459.67){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Make sure order of operations is correct
        temperature = (Number.parseFloat(5/9 * (temperatureText - 32)).toFixed(2));
      }
      
      // Convert from Fahrenheit to Kelvin. If text is a number, Selector is 1 (F), and Display is 2 (K),
      // temperature = (temperature + 459.67) * 5/9
      else if(!isNaN(temperatureText) && temperatureScale == "1" && displayScale == "2"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < -459.67){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Have to do weird things with the multiplication for it to calculate in the right order.
        // Using parseFloat to round too early with give NaN, so I did it at the end.
        // Needed to multiply temperatureText to start using it as a number
        // Put temperature + 459.67 in parenthesis because of Order of Operations
        // Finally multiplied by 5/9
        temperature = Number.parseFloat(5/9 * (1 * temperatureText + 459.67)).toFixed(2);
      }

      // Convert from Fahrenheit to Rankine. If text is a number, Selector is 1 (F), and Display is 3 (R),
      // temperature = (temperature + 459.67)
      else if(!isNaN(temperatureText) && temperatureScale == "1" && displayScale == "3"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < -459.67){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Have to do weird things with the multiplication for it to calculate in the right order.
        // Using parseFloat to round too early with give NaN, so I did it at the end.
        // Needed to multiply temperatureText to start using it as a number
        temperature = Number.parseFloat(1 * temperatureText + 459.67).toFixed(2);
      }

      // Next set is Kelvin -> New Scale

      // Convert from Kelvin to Celsius. If text is a number, Selector is 2 (K), and Display is 0 (C),
      // temperature = temperature - 273.15
      else if(!isNaN(temperatureText) && temperatureScale == "2" && displayScale == "0"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < 0.00){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Just going to calculate it inside unless another problem occurs
        // Will go back and fix above equations so they round properly to two decimal places
        temperature = Number.parseFloat(1 * temperatureText - 273.15).toFixed(2);
      }

      // Convert from Kelvin to Fahrenheit. If text is a number, Selector is 2 (K), and Display is 1 (F),
      // temperature = 9/5 * temperature - 459.67
      else if(!isNaN(temperatureText) && temperatureScale == "2" && displayScale == "1"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < 0.00){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Just going to calculate it inside unless another problem occurs
        temperature = Number.parseFloat(9/5 * temperatureText - 459.67).toFixed(2);
      }

      // Convert from Kelvin to Rankine. If text is a number, Selector is 2 (K), and Display is 3 (R),
      // temperature = 9/5 * temperature
      else if(!isNaN(temperatureText) && temperatureScale == "2" && displayScale == "3"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < 0.00){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Just going to calculate it inside unless another problem occurs
        temperature = Number.parseFloat(9/5 * temperatureText).toFixed(2);
      }

      // Final set is Rankine -> New Scale

      // Convert from Rankine to Celsius. If text is a number, Selector is 3 (R), and Display is 0 (C),
      // temperature = 5/9 * (temperature - 491.67)
      else if(!isNaN(temperatureText) && temperatureScale == "3" && displayScale == "0"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < 0.00){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Just going to calculate it inside unless another problem occurs
        temperature = Number.parseFloat(5/9 * (temperatureText - 491.67)).toFixed(2);
      }

      // Convert from Rankine to Fahrenheit. If text is a number, Selector is 3 (R), and Display is 1 (F),
      // temperature = temperature - 459.67
      else if(!isNaN(temperatureText) && temperatureScale == "3" && displayScale == "1"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < 0.00){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Just going to calculate it inside unless another problem occurs
        temperature = Number.parseFloat(temperatureText - 459.67).toFixed(2);
      }

      // Convert from Rankine to Kelvin. If text is a number, Selector is 3 (R), and Display is 2 (K),
      // temperature = 5/9 * temperature
      else if(!isNaN(temperatureText) && temperatureScale == "3" && displayScale == "2"){
        // Check for temperature to be at least Absolute Zero
        if(Number.parseFloat(temperatureText).toFixed(2) < 0.00){
          temperature = "Error!";
          return temperature;
        }
        // If it is valid, convert it
        // Just going to calculate it inside unless another problem occurs
        temperature = Number.parseFloat(5/9 * temperatureText).toFixed(2);
      }

      // End Rankine scale conversions

      // If the Selector scale is the same as the Display scale, return the temperature as is.
      // Any of the four scales to the same scale,
      // changed from C to C and F to F to this because more scales were added.
      // Must be split to account for absolute zero for 4 different possibilities.
      else if (!isNaN(temperatureText) && temperatureScale == displayScale) {
        // Check for temperature to be at least Absolute Zero
        // Celsius
        if(temperatureScale == "0" && Number.parseFloat(temperatureText).toFixed(2) < -273.15){
          temperature = "Error!";
          return temperature;
        }
        // Fahrenheit
        else if(temperatureScale == "1" && Number.parseFloat(temperatureText).toFixed(2) < -459.67){
          temperature = "Error!";
          return temperature;
        }
        // Kelvin
        else if(temperatureScale == "2" && Number.parseFloat(temperatureText).toFixed(2) < 0.00){
          temperature = "Error!";
          return temperature;
        }
        // Rankine
        else if(temperatureScale == "3" && Number.parseFloat(temperatureText).toFixed(2) < 0.00){
          temperature = "Error!";
          return temperature;
        }
        //If it is valid, return it.
        temperature = Number.parseFloat(temperatureText).toFixed(2);
      }

      // If text is not a number, return "Error!"
      else {
        temperature = "Error!";
      }
    }
    return temperature;
  }
// MVC: model ends

// MVC: controller starts
  // function that sets the temperature (number) to the number in the input box
  function handleChangeTemperature(e) {
    setTemperatureText(e.target.value);
  }

  // function that sets the temperature scale to the current value of the selector
  function handleChangeScale(e) {
    setTemperatureScale(e.target.value);
  }

  // added handleChangeDisplay to change the display scale if selected
  function handleChangeDisplay(e) {
    setDisplayScale(e.target.value);
  }
// MVC: controller ends

// MVC: view starts
  return (
    <Box className="App">
      {/* Change div to Box to implement MUI library*/}
      {/* Replaced Header html element with MUI Toolbar, try to copy the styling as best as possible. */}
      {/* sx was similar to css, inspected components to try to match. However, some didn't work so I approximated them. */}
      <Toolbar 
        sx={{ color: 'maroon', fontFamily: 'Times-New-Roman', fontSize: '2rem', fontWeight: "bold", ml: '-1.5rem'}}
      >
        Temperature Conversion
      </Toolbar>

      {/* Both Selector and Display use props to pass information */}
      <Selector
        temperature={""}
        scale={0}
        onChangeTemperature={handleChangeTemperature}
        onChangeScale={handleChangeScale}
      />
      {/* Edited Display to start at scale of zero (C) and allow for display scale to be changed */}
      {/* In Homework 2, it was necessary to call convert temperature directly instead of it being handled by a click */}
      {/* because we want it to change automatically without a convert button. */}
      {/* This approach immediately calls the function and sets the Display value to the temperature returned. */}
      {/* It also updates the value correctly. My first approaches didn't update Display until the next value was entered in Selector. */}
      <Display 
        temperature={convertTemperature()}
        scale={0}
        onChangeTemperature={handleChangeTemperature}
        onChangeScale={handleChangeDisplay}
      />
    </Box>
  );
// MVC: view ends
}

export default App;
