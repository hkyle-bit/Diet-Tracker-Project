//
// Homework 3
// Selector JavaScript source code
//
// Author: Denis Gracanin
// Author: Kyle Hong
// Version: 1.0
//
// imported MUI components
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import './Selector.css';

// props info is from App.js
// has a dropdown menu to change scale from 4 different choices
// as well as an input box to enter a number (must be at least absolute zero for the chosen scale)
function Selector(props) {
  return (
    <Box className="Selector" component="div">
      {/* Change div to Box to implement MUI library*/}

        {/* Input type changed to number to only allow correct values */}
        {/* e is still allowed because React uses it for exponents */}
        {/* Min being -459.67 because that's the lowest possible temperature from any scale */}
        {/* Added tooltip that informs the user about the number value box and that it must be used with the scale selector */}
        {/* Tooltip can't fit above or to the left, */}
        {/* so I chose to the right because accidentally hovering when selecting Display would be annoying. */}
        {/* Changed input to Input (html to MUI) */}
        {/* Added Grid container and Grid in order to use MUI Tooltips */}
        {/* Changed html Tooltip to MUI Tooltip, placed inside Grids. */}
        {/* Since they are around the right component hierarchically, they only pop up for that inner component as intended. */}
      <Grid container sx={{ justifyContent: 'left' }}>
        <Grid item xs={3}>
            <Tooltip title="Input a number here and adjust the scale on the right to your desired choice.
              Selecting a different scale for the bottom box will convert the temperature automatically
              and output into the bottom box depending on what scale is selected there." 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeTemperature} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  '& input[type="number"]': {
                    textAlign: 'right',
                  },
                  '& input[type=number]::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                  },
                  '& input[type=number]::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                  },
                }}
              >
              </Input>
            </Tooltip>
        
            {/* Edited the Temperature Scale button to show a tooltip of how to use the temperature converter */}
            {/* They are on the right to not cover other information. */}
            {/* Added the id of the tooltip and the placement to the props. */}
            {/* Changed html select to MUI Select, set default value to celsius, changed to sx since css no longer applies. */}
            <Tooltip title="The list of scales are Celsius, Fahrenheit, Kelvin, and Rankine.
                Selecting a different scale from the bottom will convert the temperature automatically
                and output into the bottom box depending on what scale is selected there." 
                placement="right"
            >
            <Select onChange={props.onChangeScale} value={props.value} defaultValue={0} data-tooltip-id="Selector-scales-tooltip" data-tooltip-place="right"
            MenuProps={{ 
              MenuListProps: { 
                disablePadding: true 
              } 
            }}
            sx={{
                background: 'maroon',
                color: 'white',
                fontSize: '13px',
                width: '100px', 
                height: '20px', 
                fontFamily: 'Arial',
                border: '1px solid gray',
                display: 'flex-start',
                paddingTop: '0',
                '& .MuiSelect-select': {
                  textAlign: 'left',         
                  color: 'white',   
                },
                '& svg': {
                  fill: 'white',
                },
              }}
            >
              
              {/* MUI MenuItem replaced HTML options */}
              <MenuItem value={0} sx={{
                backgroundColor: 'maroon',
                color: 'white',
                fontSize: '13px',
                width: '100px', 
                height: '20px', 
                fontFamily: 'Arial',
                border: '1px solid gray',
                display: 'flex-start',
                
              }}>Celsius</MenuItem>
              <MenuItem value={1} sx={{
                backgroundColor: 'maroon',
                color: 'white',
                fontSize: '13px',
                width: '100px', 
                height: '20px', 
                fontFamily: 'Arial',
                border: '1px solid gray',
                display: 'flex-start',
              }}>Fahrenheit</MenuItem>
              <MenuItem value={2} sx={{
                backgroundColor: 'maroon',
                color: 'white',
                fontSize: '13px',
                width: '100px', 
                height: '20px', 
                fontFamily: 'Arial',
                border: '1px solid gray',
                display: 'flex-start',
              }}>Kelvin</MenuItem>
              <MenuItem value={3} sx={{
                backgroundColor: 'maroon',
                color: 'white',
                fontSize: '13px',
                width: '100px', 
                height: '20px', 
                fontFamily: 'Arial',
                border: '1px solid gray',
                display: 'flex-start',
              }}>Rankine</MenuItem>
            </Select>
          </Tooltip> 
        </Grid>
      </Grid> 
    </Box>
  );
}

export default Selector;
