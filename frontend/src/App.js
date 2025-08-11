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
  // Monthly or weekly
  const [timeMode, setTimeMode] = useState('week');
  // Nutrition or Hazard
  const [mode, setMode] = useState('nutrition');

  // Nutritional values
  const [calories, setCalories] = useState("0");
  const [protein, setProtein] = useState("0");
  const [saturatedFats, setSaturatedFats] = useState("0");
  const [transFats, setTransFats] = useState("0");
  const [cholesterol, setCholesterol] = useState("0");
  const [sodium, setSodium] = useState("0");
  const [carbohydrates, setCarbohydrates] = useState("0");
  const [fiber, setFiber] = useState("0");
  const [sugar, setSugar] = useState("0");

  // Ensures text uses the food title and not the most recent input
  const [foodText, setFoodText] = useState("");

  // Checks if the food/beverage contains dangerous substances
  // Will only work accurately if the food is pure or the amount given is
  // just the dangerous portion of the food/beverage
  const targetArsenic = ['rice', 'brown rice']; 
  const isMatchArsenic = targetArsenic.some(rice =>
    foodText.toLowerCase().includes(rice.toLowerCase())
  );

  const targetMercury = ['tuna', 'marlin', 'swordfish', 'shark'];
  const isMatchMercury = targetMercury.some(fish =>
    foodText.toLowerCase().includes(fish.toLowerCase())
  );

  const targetCadmium = ['oyster', 'mussel', 'scallop', 'crab', 'lobster', 'seaweed'];
  const isMatchCadmium = targetCadmium.some(seafood =>
    foodText.toLowerCase().includes(seafood.toLowerCase())
  );

  // Data for Mongoose
  const [chartData, setChartData] = useState([]);

  // Save weekly data
  // Will need user to delete data to start a new week because of project time constraint
  const handleSave = () => {
    const formattedData = [
      { category: 'Calories', value: calories },
      { category: 'Saturated Fats', value: saturatedFats },
      { category: 'Trans Fats', value: transFats },
      { category: 'Cholesterol', value: cholesterol },
      { category: 'Sodium', value: sodium },
      { category: 'Carbohydrates', value: carbohydrates },
      { category: 'Fiber', value: fiber },
      { category: 'Sugar', value: sugar },
      { category: 'Protein', value: protein }
    ];

    setTimeMode('week')
    setMode('nutrition')

    // Save all three entries
    fetch('http://localhost:5000/api/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    })
      .then(res => res.json())
      .then(saved => {
       // console.log('Saved:', saved);

        // Fetch weekly summary grouped by category
        return fetch('http://localhost:5000/api/chart/week-summary');
      })
      .then(res => res.json())
      .then(summary => {
        const normalized = [
          'Calories',
          'Saturated Fats',
          'Trans Fats',
          'Cholesterol',
          'Sodium',
          'Carbohydrates',
          'Fiber',
          'Sugar',
          'Protein'
        ].map(cat => {
          const found = summary.find(d => d.category === cat);
          return {
            category: cat,
            value: found ? found.value : 0
          };
        });

        setChartData(normalized);
      })
      .catch(err => console.error('Error saving or fetching chart data:', err));
  };

  // Save monthly data
  // Will need user to delete data to start a new week because of project time constraint
  const handleSaveMonthly = () => {
    const formattedData = [
      { category: 'Calories', value: calories },
      { category: 'Saturated Fats', value: saturatedFats },
      { category: 'Trans Fats', value: transFats },
      { category: 'Cholesterol', value: cholesterol },
      { category: 'Sodium', value: sodium },
      { category: 'Carbohydrates', value: carbohydrates },
      { category: 'Fiber', value: fiber },
      { category: 'Sugar', value: sugar },
      { category: 'Protein', value: protein }
    ];

    setTimeMode('month')
    setMode('nutrition')

    // Save all three entries
    fetch('http://localhost:5000/api/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    })
      .then(res => res.json())
      .then(saved => {
       // console.log('Saved:', saved);

        // Fetch weekly summary grouped by category
        return fetch('http://localhost:5000/api/chart/week-summary');
      })
      .then(res => res.json())
      .then(summary => {
        const normalized = [
          'Calories',
          'Saturated Fats',
          'Trans Fats',
          'Cholesterol',
          'Sodium',
          'Carbohydrates',
          'Fiber',
          'Sugar',
          'Protein'
        ].map(cat => {
          const found = summary.find(d => d.category === cat);
          return {
            category: cat,
            value: found ? found.value : 0
          };
        });

        setChartData(normalized);
      })
      .catch(err => console.error('Error saving or fetching chart data:', err));
  };

  // Save weekly hazardous data
  // Will need user to delete data to start a new week because of project time constraint
  const handleSaveHazardous = () => {
    const arsenicData = countArsenic();
    const mercuryData = countMercury();
    const cadmiumData = countCadmium();

    const formattedData = [
      { category: 'Arsenic', value: arsenicData },
      { category: 'Mercury', value: mercuryData },
      { category: 'Cadmium', value: cadmiumData }
    ];

    setTimeMode('week')
    setMode('hazard')

    //console.log("Sending to backend:", formattedData);

    // Save all three entries
    fetch('http://localhost:5000/api/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    })
      .then(res => res.json())
      .then(saved => {
        //console.log('Saved:', saved);

        // Fetch weekly summary grouped by category
        return fetch('http://localhost:5000/api/chart/week-summary');
      })
      .then(res => res.json())
      .then(summary => {
        // Normalize chart to ensure all categories are present
        const normalized = ['Arsenic', 'Mercury', 'Cadmium'].map(cat => {
          const found = summary.find(d => d.category === cat);
          return {
            category: cat,
            value: found ? found.value : 0
          };
        });

        setChartData(normalized);
      })
      .catch(err => console.error('Error saving or fetching chart data:', err));
  };

  // Save monthly hazardous data
  // Will need user to delete data to start a new month because of project time constraint
  const handleSaveMonthlyHazardous = () => {
    const arsenicData = countArsenic();
    const mercuryData = countMercury();
    const cadmiumData = countCadmium();

    const formattedData = [
      { category: 'Arsenic', value: arsenicData },
      { category: 'Mercury', value: mercuryData },
      { category: 'Cadmium', value: cadmiumData }
    ];

    setTimeMode('month')
    setMode('hazard')

    //console.log("Sending to backend:", formattedData);

    // Save all three entries
    fetch('http://localhost:5000/api/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    })
      .then(res => res.json())
      .then(saved => {
        //console.log('Saved:', saved);

        // Fetch weekly summary grouped by category
        return fetch('http://localhost:5000/api/chart/week-summary');
      })
      .then(res => res.json())
      .then(summary => {
        // Normalize chart to ensure all categories are present
        const normalized = ['Arsenic', 'Mercury', 'Cadmium'].map(cat => {
          const found = summary.find(d => d.category === cat);
          return {
            category: cat,
            value: found ? found.value : 0
          };
        });

        setChartData(normalized);
      })
      .catch(err => console.error('Error saving or fetching chart data:', err));
  };

  // Clear BarChart data
  const handleClear = () => {
    fetch('http://localhost:5000/api/chart', { method: 'DELETE' })
      .then(() => {
        setChartData([]);
        //console.log('Chart data cleared');
      })
      .catch(err => console.error('Error clearing chart data:', err));
  };

  /*
   * Returns the amount of arsenic in a given food/beverage
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
    if(isMatchArsenic && amount > 0 && foodText.toLowerCase().includes(targetArsenic[0])){
      // 150 parts per billion of arsenic per gram of white rice on average
      dangerousAmount = 0.000000150 * amount;
    }

    if(isMatchArsenic && amount > 0 && foodText.toLowerCase().includes(targetArsenic[1])){
      // 300 parts per billion of arsenic per gram of brown rice on average
      dangerousAmount = 0.000000300 * amount;
    }

    return dangerousAmount;
  }
  
  // Returns the amount of mercury in a food/beverage
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
    if(isMatchMercury && amount > 0 && foodText.toLowerCase().includes(targetMercury[0])){
      // 60 micrograms of mercury per gram of tuna on average
      mercuryAmount = 0.00000060 * amount;
    }

    // Safe weekly Marlin amount
    if(isMatchMercury && amount > 0 && foodText.toLowerCase().includes(targetMercury[1])){
      // 152 micrograms of mercury per gram of marlin on average
      mercuryAmount = 0.00000152 * amount;
    }

    // Safe weekly Swordfish amount
    if(isMatchMercury && amount > 0 && foodText.toLowerCase().includes(targetMercury[2])){
      // 99.5 micrograms of mercury per gram of swordfish on average
      mercuryAmount = 0.000000995 * amount;
    }

    // Safe weekly Shark amount
    if(isMatchMercury && amount > 0 && foodText.toLowerCase().includes(targetMercury[3])){
      // 99 micrograms of mercury per gram of shark on average
      mercuryAmount = 0.00000099 * amount;
    }

    return mercuryAmount;
  }

  /*
   * Returns the amount of cadmium in a given food/beverage
   */
  function countCadmium() {
    let dangerousAmount = 0;

    // If name matches a hazardous food, check for harmful substance
    // Will only be able to check common hazardous foods
    // This time I should not use parse float because the amounts are so small
    // It will only show meaningful results over a longer period of time
    // Rounding would keep adding 0 to the total instead of the actual amount
    // Known limitations: Can only track food that has been coded for, and only 1 harmful substance at a time
    // Numbers will turn red for AVERAGE body weight
    if(isMatchCadmium && amount > 0 && (foodText.toLowerCase().includes(targetCadmium[0]) ||
    foodText.toLowerCase().includes(targetCadmium[1]) || foodText.toLowerCase().includes(targetCadmium[2]))){
      // 0.00000125 grams of cadmium per gram of mollusks on average
      dangerousAmount = 0.00000125 * amount;
    }

    if(isMatchCadmium && amount > 0 && (foodText.toLowerCase().includes(targetCadmium[3]) || foodText.toLowerCase().includes(targetCadmium[4]))){
      // 0.0000015 grams of cadmium per gram of crab/lobster on average
      dangerousAmount = 0.0000015 * amount;
    }

    if(isMatchCadmium && amount > 0 && foodText.toLowerCase().includes(targetCadmium[5])){
      // 0.000001015 grams of cadmium per gram of seaweed on average
      dangerousAmount = 0.000001015 * amount;
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

  function handleChangeMeasurement(e) {
    setMeasurement(e.target.value);
  }

  // Handles nutritional number changes
  function handleChangeCalories(e) {
    setCalories(e.target.value);
  }

  function handleChangeProtein(e) {
    setProtein(e.target.value);
  }

  function handleChangeSaturatedFats(e) {
    setSaturatedFats(e.target.value);
  }

  function handleChangeTransFats(e) {
    setTransFats(e.target.value);
  }

  function handleChangeCholesterol(e) {
    setCholesterol(e.target.value);
  }

  function handleChangeSodium(e) {
    setSodium(e.target.value);
  }

  function handleChangeCarbohydrates(e) {
    setCarbohydrates(e.target.value);
  }

  function handleChangeFiber(e) {
    setFiber(e.target.value);
  }

  function handleChangeSugar(e) {
    setSugar(e.target.value);
  }

// MVC: controller ends

// MVC: view starts
  return (
    <Box className="App" sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      {/* Change div to Box to implement MUI library*/}
      {/* Replaced Header html element with MUI Toolbar, try to copy the styling as best as possible. */}
      {/* sx was similar to css, inspected components to try to match. However, some didn't work so I approximated them. */}
      <Toolbar className="text-blue-800 text-4xl font-bold grid place-items-center h-screen"
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

      {/* Selector uses props to pass information */}
      <Selector
        onChangeText={e => setFoodText(e.target.value)}
        onChangeAmount={handleChangeAmount}
        onChangeCalories={handleChangeCalories}
        onChangeSaturatedFats={handleChangeSaturatedFats}
        onChangeTransFats={handleChangeTransFats}
        onChangeCholesterol={handleChangeCholesterol}
        onChangeSodium={handleChangeSodium}
        onChangeCarbohydrates={handleChangeCarbohydrates}
        onChangeFiber={handleChangeFiber}
        onChangeSugar={handleChangeSugar}
        onChangeProtein={handleChangeProtein}
        amountArsenic={countArsenic()}
        amountMercury={countMercury()}
        amountCadmium={countCadmium()}
        onChangeMeasurement={handleChangeMeasurement}
        value={measurement}
        foodText={foodText}
      />

      {/* Add save and delete buttons and ensure spacing. Add styling */}
      <div className="space-y-4 mt-4">
        <br />
        <button
          onClick={() =>{ handleSave(); }}
          className="inline-block text-blue-800 text-1xl border border-blue-700 font-bold grid place-items-center h-screen"
        >
          Show Weekly Data
        </button>
        <br />
        <button
          onClick={() =>{ handleSaveMonthly(); }}
          className="inline-block text-blue-800 text-1xl border border-blue-700 font-bold grid place-items-center h-screen"
        >
          Show Monthly Data
        </button>
        <br />
        <button
          onClick={() =>{ handleSaveHazardous(); }}
          className="inline-block text-blue-800 text-1xl border border-blue-700 font-bold grid place-items-center h-screen"
        >
          Show Weekly Hazardous Data
        </button>
        <br />
        <button
          onClick={() =>{ handleSaveMonthlyHazardous(); }}
          className="inline-block text-blue-800 text-1xl border border-blue-700 font-bold grid place-items-center h-screen"
        >
          Show Monthly Hazardous Data
        </button>
        <br />
        <button
          onClick={handleClear}
          className="inline-block text-blue-800 text-1xl border border-blue-700 font-bold grid place-items-center h-screen"
        >
          Delete Chart Data
        </button>
      </div>

      <BarChart key={chartData.length} data={chartData} timeMode={timeMode} mode={mode} measurement={measurement}>
      </BarChart>
    </Box>
  );
// MVC: view ends
}

export default App;
