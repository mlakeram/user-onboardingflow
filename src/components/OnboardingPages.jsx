import { useState } from 'react';
import Credentials from './Credentials';
import Birthday from './Birthday';
import AboutMe from './AboutMe';
import Address from './Address';
import Tos from './Tos';

export default function OnboardingPages() {
  const [onboardStep, setOnboardStep] = useState(0);
  const onBoardPages = [
    [<Credentials key='credentials' />],
    [<Birthday key='birthday' />, <AboutMe key='aboutme' />],
    [<Address key='address' />],
    [<Tos key='tos' />],
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
