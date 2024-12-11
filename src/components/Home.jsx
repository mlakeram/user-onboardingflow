import { useState } from 'react';

export default function Home() {
  const [onboardStep, setOnboardStep] = useState(0);
  const onBoardPages = [
    <div key='0'>Page 1 - Email & Password</div>,
    <div key='1' id='page=1 page=2'>
      Page 2 - Birthday & About Me
    </div>,
    <div key='1'>Page 3 - Address</div>,
    <div key='1'>Page 4 - Terms And Conditions</div>,
  ];

  function handleNextClick() {
    setOnboardStep((onboardStep) => onboardStep + 1);
  }

  return (
    <div id='appContainer'>
      {onBoardPages[onboardStep % onBoardPages.length]}
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}
