import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import { client } from '../lib/client';
import { runFireworks } from '../lib/utils';

import Switch from 'react-switch';

// Dynamically import the RouletteWheel component with SSR disabled
const RouletteWheel = dynamic(() => import('react-custom-roulette').then(mod => mod.Wheel), { ssr: false });

const Wheel = ({ announcements, release }) => {
  const [mustSpin, setMustSpin] = useState([]);
  const [prizeNumbers, setPrizeNumbers] = useState([]);
  const [isAlternativeWheel, setIsAlternativeWheel] = useState(false);
  const [numberOfWheels, setNumberOfWheels] = useState(1);
  const [spinningDuration, setSpinningDuration] = useState(""); // Default spinning duration
  const [results, setResults] = useState([]);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const [isSpinning, setIsSpinning] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [colors, setColors] = useState({
    primaryColor: '#000',
    secondaryColor: '#fff',
    discountBoxcolor: '#ccc',
  });

  useEffect(() => {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primarycolor').trim();
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondarycolor').trim();
    const discountBoxcolor = getComputedStyle(document.documentElement).getPropertyValue('--discountboxcolor').trim();

    setColors({ primaryColor, secondaryColor, discountBoxcolor });
  }, []);

  // Default wheel data with win/loss logic inside the data
  const data = [
    { option: 'Lose 1', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Lose 2', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Win 2', style: { backgroundColor: colors.primaryColor, textColor: colors.secondaryColor }, isWin: true },
    { option: 'Lose 3', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Lose 4', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Win 1', style: { backgroundColor: colors.primaryColor, textColor: colors.secondaryColor }, isWin: true },
  ];

  // Alternative wheel data with 8 options where only one is a win
  const alternativeData = [
    { option: 'Lose 1', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Lose 2', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Lose 3', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Lose 4', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Lose 5', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Lose 6', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Lose 7', style: { backgroundColor: colors.secondaryColor, textColor: colors.primaryColor }, isWin: false },
    { option: 'Win 1', style: { backgroundColor: colors.primaryColor, textColor: colors.secondaryColor }, isWin: true },
  ];


  const filters = [
    
    "brightness(1.2) saturate(150%) invert(20%) sepia(10%) saturate(200%) hue-rotate(200deg) brightness(90%) contrast(85%)", // Blue/Teal
    "brightness(0) saturate(100%) invert(42%) sepia(66%) saturate(737%) hue-rotate(290deg) brightness(83%) contrast(93%)",  // Yellow/Golden
    "brightness(0.9) saturate(200%) invert(10%) sepia(40%) saturate(300%) hue-rotate(180deg) brightness(70%) contrast(100%)", // Cyan/Teal
    " brightness(0) saturate(100%) invert(58%) sepia(39%) saturate(6398%) hue-rotate(108deg) brightness(102%) contrast(103%)",    // Deep Blue/Indigo
    "brightness(0.7) saturate(130%) invert(25%) sepia(35%) saturate(250%) hue-rotate(150deg) brightness(85%) contrast(75%)",  // Green
    "brightness(1.1) saturate(110%) invert(40%) sepia(20%) saturate(150%) hue-rotate(270deg) brightness(100%) contrast(80%)", // Purple
    "brightness(0.6) saturate(140%) invert(45%) sepia(55%) saturate(350%) hue-rotate(310deg) brightness(65%) contrast(120%)", // Magenta/Pink
    "none" // Transparent filter, no changes applied
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const assignFilters = (numWheels) => {
    let availableFilters = shuffleArray([...filters]);
    const assignedFilters = [];
    for (let i = 0; i < numWheels; i++) {
      if (availableFilters.length === 0) {
        availableFilters = shuffleArray([...filters]);
      }
      assignedFilters.push(availableFilters.pop());
    }
    return assignedFilters;
  };




  // Choose the correct data based on the switch
  const currentData = isAlternativeWheel ? alternativeData : data;

  const handleSpinClick = () => {
  //if (isSpinning) return; // Prevent multiple spins

  const newPrizeNumbers = Array.from({ length: numberOfWheels }, () =>
    Math.floor(Math.random() * currentData.length)
  );
  setPrizeNumbers(newPrizeNumbers);
  setMustSpin(new Array(numberOfWheels).fill(true));
  setResults([]); // Clear previous results
  setShowResultsModal(false); // Hide results modal when spinning starts
  setIsSpinning(true); // Set spinning state to true
};

const handleSpinWheelClick = () => {
  if (isSpinning) return; // Prevent spinning via wheel when already spinning
  handleSpinClick();
};

  const handleToggleWheel = (checked) => {
    setIsAlternativeWheel(checked);
  };

  const onStopSpinning = (index) => {
    const selectedOption = currentData[prizeNumbers[index]];
    const isWin = selectedOption.isWin;
  
    setMustSpin((prev) => {
      const newMustSpin = [...prev];
      newMustSpin[index] = false;
  
      // Update results
      setResults((prevResults) => {
        if (prevResults.find(result => result.wheelNumber === index + 1)) {
          return prevResults; // Result already exists for this wheel
        }
  
        const newResults = [
          ...prevResults,
          { wheelNumber: index + 1, isWin, option: selectedOption.option },
        ];
  
        // Check if all wheels have stopped spinning
        if (newResults.length === numberOfWheels && newMustSpin.every(spin => !spin)) {
          if (numberOfWheels > 1) {
            setShowResultsModal(true);  // Show results modal if more than 1 wheel
            if (newResults.some(result => result.isWin)) {
              runFireworks();  // Run fireworks if at least one wheel won
            }
          } else {
            // For single wheel, show result directly above the wheel
            if (isWin) {
              runFireworks();  // Run fireworks if the single wheel won
            }
          }
          setIsSpinning(false); // Reset spinning state
        }
  
        return newResults;
      });
  
      return newMustSpin;
    });
  };


  const handleSpinningDurationChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 1 && Number(value) <= 10)) {
      setSpinningDuration(value); // Allow setting to empty or a valid number
    }
  };

  const renderSingleWheelResult = () => {
    if (results.length === 1 && numberOfWheels === 1) {
      const { isWin, option } = results[0];
      return (
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
          Wheel Nr 1 - {isWin ? `Won (${option})` : `Lost (${option})`}
        </div>
      );
    }
    return null;
  };

 const renderWheels = () => {
  const assignedFilters = assignFilters(numberOfWheels);
  return Array.from({ length: numberOfWheels }).map((_, index) => (
    <div
      key={index}
      style={{
        flex: '1 1 50%', // Allows each wheel to take up 50% of the row
        boxSizing: 'border-box',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>{numberOfWheels === 1 ? 'Märkeshjulet' : `Wheel ${index + 1}`}</h2>
      <div   style={{cursor: "pointer",  borderRadius: "300px"}}    onClick={() => handleSpinWheelClick()} // Spin on wheel click
      >
      <RouletteWheel
        mustStartSpinning={mustSpin[index]}
        prizeNumber={prizeNumbers[index]}
        data={currentData}
        backgroundColors={['#3e3e3e', '#df3428']}
        textColors={['#ffffff']}
        onStopSpinning={() => onStopSpinning(index)}
        spinDuration={numberOfWheels === 1 ? (0.5 + spinningDuration * 0.05 || 1) : 1}
        pointerProps={{
          style: {
            filter: assignedFilters[index],
          },
        }}
      />
      </div>
      {/* Optionally, display result for single wheel directly */}
      {numberOfWheels === 1 && renderSingleWheelResult()}
    </div>
  ));
};

  const renderResultButton = () => {
    return (
      <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
        <button
          onClick={() => setShowResultsModal(true)}
          className='purchasebuttons'
        >
          View Results
        </button>
      </div>
    );
  };

  const renderSpinButton = () => {
    return (
      <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleSpinClick} className='wheelbuttons' style={{ backgroundColor: 'var(--primarycolor)',  color: 'white' }}>
          Spin the Wheel
        </button>
      </div>
    );
  };

  
  /*
  const handleNumberOfWheelsChange = (e) => {
    const newNumberOfWheels = Number(e.target.value);
    setSpinningDuration("");
    setNumberOfWheels(newNumberOfWheels);
    setResults([]); // Clear previous results when the number of wheels changes
  }; */

  const renderResultsModal = () => {
    if (results.length === 0) return null;

    const winners = results.filter(result => result.isWin);
    const losers = results.filter(result => !result.isWin);

    return (
      <div
        style={{
          position: 'fixed',
          zIndex: 1000,
          top: 30,
          left: 0,
          width: '100%',
          height: '70%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => setShowResultsModal(false)}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            minWidth: '300px',
            maxWidth: '500px',
            textAlign: 'center',
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside it
        >
          <h2>Results</h2>
          <div>
            {winners.length > 0 && (
              <div>
                <h3>Winners</h3>
                {winners.map((result) => (
                  <p key={result.wheelNumber}>
                    Wheel Nr {result.wheelNumber} - Won ({result.option})
                  </p>
                ))}
              </div>
            )}
            {losers.length > 0 && (
              <div>
                <h3>Losers</h3>
                {losers.map((result) => (
                  <p key={result.wheelNumber}>
                    Wheel Nr {result.wheelNumber} - Lost ({result.option})
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar announcements={announcements} release={release} />
  
      <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
        <label>
          <span style={{ marginRight: '10px', marginTop: "-20px" }}>Bra {spinningDuration}</span>
          <Switch
            checked={isAlternativeWheel}
            onChange={handleToggleWheel}
            onColor={colors.secondaryColor}
            offColor={colors.primaryColor}
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            
          />
          <span style={{ marginLeft: '10px', marginBottom: "20px" }}>Riggat</span>
        </label>
      </div>
  
     

      {results.length === 1 && numberOfWheels === 1 && renderSingleWheelResult()}

      {results.length > 0 && (
        renderResultButton()
      )}

      {numberOfWheels > 1 && (
        renderSpinButton()
      )}

      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
        {renderWheels()}
      </div>
  
      {results.length > 0 && numberOfWheels > 1 && renderResultButton()}
  
      {renderSpinButton()}

      {numberOfWheels === 1 && (
        <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          <label>
           Choose a number (1-10):
            <input
              type="number"
             
              value={spinningDuration}
              onChange={handleSpinningDurationChange}
              style={{ marginLeft: '10px', padding: '5px', fontSize: '16px' }}
            />
          </label>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {[...Array(12).keys()].map(n => (
          <button
            key={n + 1}
            onClick={() => {
              setNumberOfWheels(n + 1);
              setInputValue("");  // Clear input field
            }}
            style={{
              margin: '5px',
              padding: '10px 15px',
              fontSize: '16px',
              backgroundColor: numberOfWheels === n + 1 ? colors.primaryColor : colors.secondaryColor,
              color: numberOfWheels === n + 1 ? colors.secondaryColor : colors.primaryColor,
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {n + 1}
          </button>
        ))}
      </div>
      {/*
      <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
        <input
          type="number"
          placeholder="Enter custom number"
          value={inputValue}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value > 0) {
              setNumberOfWheels(value);
              setInputValue(e.target.value);
            } else {
              setInputValue("");
            }
          }}
          style={{ padding: '10px', fontSize: '16px', width: '50%', maxWidth: '200px' }}
        />
      </div> */}




  
      <div style={{ width: '100%', textAlign: 'center', marginTop: '50px' }}>
        <img src="/assets/paymentlogos/instaqrkod.png" alt="Payment Logos" style={{ width: '90%', maxWidth: '400px', height: 'auto' }} />
      </div>
  
      {showResultsModal && renderResultsModal()}
    </div>
  );
};

export const getServerSideProps = async () => {
  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  return {
    props: { announcements, release },
  };
};

export default Wheel;