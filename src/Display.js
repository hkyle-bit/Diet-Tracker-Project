//
// Homework 3
// Display JavaScript source code
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
import './Display.css';

// readonly display of the converted temperature
// props info is from App.js
// has a dropdown menu to select a scale from 4 choices
function Display(props) {
  return (
    <Box className="Display" component="div">
      {/* Change div to Box to implement MUI library*/}

      {/* Input type changed to number to only allow correct values */}
      {/* e is still allowed because React uses it for exponents */}
      {/* Min being -459.67 because that's the lowest possible temperature from any scale */}
      {/* This change here is probably not as necessary as in Selector.js, but better to be safe. */}

      {/* Tooltip added which informs this box will output the calculated value if values are provided in the selector. */}
      {/* Tooltip can't fit above or to the left, */}
      {/* so I chose to the right because accidentally hovering when selecting Display would be annoying. */}
      {/* Changed input from html to Input from MUI */}
      {/* Added Grid container and Grid in order to use MUI Tooltips */}
      {/* Changed html Tooltip to MUI Tooltip, placed inside Grids. */}
      {/* Since they are around the right component hierarchically, they only pop up for that inner component as intended. */}
      <Grid container sx={{ justifyContent: 'left' }}>
          <Grid item xs={3}>
            <Tooltip title="This number will be the output of the temperature conversion
              displayed in terms of the selected scale to the right.
              It will only appear after a number has been inputted in the above box." 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" disabled value={props.temperature} data-tooltip-id="Display-input-tooltip" data-tooltip-place="right"
              sx={{
                    backgroundColor: 'field',
                    borderStyle: 'inset',
                    borderImage: 'initial',
                    border: '1px solid',
                    borderWidth: '2px',
                    borderColor: '#7676764d',
                    fontSize: '12.5px',
                    width: '169px', 
                    height: '22.5px', 
                    fontFamily: 'Arial',
                    padding: '1px 0px',
                    opacity: '0.7',
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
          {/* added a selection for temperature scale to convert to */}
          <Tooltip title="The list of scales are Celsius, Fahrenheit, Kelvin, and Rankine.
              Selecting a different scale from the top will convert the temperature
              into the new temperature scale automatically
              and output into the box on the left depending on what scale is selected here." 
              placement="right"
          >
          <Select onChange={props.onChangeScale} value={props.value} defaultValue={0} data-tooltip-id="Display-scales-tooltip" data-tooltip-place="right"
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
              '& .MuiSelect-select': {
                textAlign: 'left',         
                color: 'white',            
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
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

export default Display;
