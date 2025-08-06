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
import Toolbar from '@mui/material/Toolbar';
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
      <Grid container spacing={2} sx={{ justifyContent: 'left' }}>
        {/* Four inner grids to make Four columns */}
        <Grid item xs={12} sm={6}>
          <Toolbar 
            sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
          >
            Food/Beverage Product
          </Toolbar>
            <Tooltip title="Food/Beverage Product" 
              placement="right"
            >
              <Input type="string" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
                  '& input[type="string"]': {
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

            {/*
            <Tooltip title="The list of measurements are grams and percent daily intake." 
                placement="right"
            >
            <Select onChange={props.onChangeMeasurement} value={props.value} defaultValue={0} data-tooltip-id="Selector-scales-tooltip" data-tooltip-place="right"
            MenuProps={{ 
              MenuListProps: { 
                disablePadding: true 
              } 
            }}
            sx={{
                background: 'darkblue',
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
              
              <MenuItem value={0} sx={{
                backgroundColor: 'darkblue',
                color: 'white',
                fontSize: '13px',
                width: '100px', 
                height: '20px', 
                fontFamily: 'Arial',
                border: '1px solid gray',
                display: 'flex-start',
              }}>Grams</MenuItem>
              <MenuItem value={1} sx={{
                backgroundColor: 'darkblue',
                color: 'white',
                fontSize: '13px',
                width: '100px', 
                height: '20px', 
                fontFamily: 'Arial',
                border: '1px solid gray',
                display: 'flex-start',
              }}>Percent</MenuItem>
            </Select>
          </Tooltip>
          */}
          </Grid>

        <Grid item xs={12} sm={6}>
          <Toolbar 
            sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
          >
            Amount (Grams)
          </Toolbar>
            <Tooltip title="Amount (Grams)" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeAmount} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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

          <Toolbar 
            sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
          >
            Calories
          </Toolbar>
            <Tooltip title="Calories" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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

          <Toolbar 
            sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
          >
            Saturated Fats
          </Toolbar>
            <Tooltip title="Saturated Fats" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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

            <Toolbar 
              sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Trans Fats
            </Toolbar>
            <Tooltip title="Trans Fats" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
            
            <Toolbar 
              sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Cholesterol
            </Toolbar>
            <Tooltip title="Cholesterol" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <Toolbar 
              sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Sodium
            </Toolbar>
            <Tooltip title="Sodium" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
                    
            <Toolbar 
              sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Carbohydrates
            </Toolbar>
            <Tooltip title="Carbohydrates" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
            
            <Toolbar 
              sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Fiber
            </Toolbar>
            <Tooltip title="Fiber" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
            
            <Toolbar 
              sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Sugar
            </Toolbar>
            <Tooltip title="Sugar" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
            
            <Toolbar 
              sx={{ color: 'darkblue', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Protein
            </Toolbar>
            <Tooltip title="Protein" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" onChange={props.onChangeText} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
            </Grid>

        {/* Hazardous substances according to the CDC https://www.fda.gov/food/chemical-contaminants-pesticides/environmental-contaminants-food */}
        <Grid item xs={12} sm={6}>
            <Toolbar 
              sx={{ color: 'red', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Arsenic
            </Toolbar>
            <Tooltip title="Arsenic" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" defaultValue={0} disabled value={props.amountArsenic} onChange={props.onChangeAmount} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
                    
            <Toolbar 
              sx={{ color: 'red', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Lead
            </Toolbar>
            <Tooltip title="Lead" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" defaultValue={0} disabled value={props.amount} onChange={props.onChangeAmount} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
            
            <Toolbar 
              sx={{ color: 'red', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Mercury
            </Toolbar>
            <Tooltip title="Mercury" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" defaultValue={0} disabled value={props.amountMercury} onChange={props.onChangeAmount} danger={props.danger}
                sx={{
                  background: props.danger ? 'red' : 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
              {props.danger ? 'True' : 'False'}
              </Input>
            </Tooltip>
            
            <Toolbar 
              sx={{ color: 'red', fontFamily: 'Times-New-Roman', fontSize: '16px', disablePadding: 'true'}}
            >
              Cadmium
            </Toolbar>
            <Tooltip title="Cadmium" 
              placement="right"
            >
              <Input type="number" size="8" min="-459.67" defaultValue={0} disabled value={props.amount} onChange={props.onChangeAmount} data-tooltip-id="Selector-input-tooltip" data-tooltip-place="right"
                sx={{
                  background: 'white',
                  color: 'black',
                  fontSize: '12.5px',
                  width: '169px', 
                  height: '22.5px', 
                  fontFamily: 'Arial',
                  contentDisplay: 'flex-end',
                  marginLeft: '25px',
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
          </Grid>
      </Grid> 
    </Box>
  );
}

export default Selector;
