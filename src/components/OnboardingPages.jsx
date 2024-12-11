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
    if (onboardStep < onBoardPages.length - 1) {
      setOnboardStep((onBoardStep) => onBoardStep + 1);
    }
  }

  function handleBackClick() {
    if (onboardStep > 0) {
      setOnboardStep((onBoardStep) => onBoardStep - 1);
    }
  }

  return (
    <div id='onboardingPagesContainer'>
      {onboardStep > 0 && <button onClick={handleBackClick}>Back</button>}
      {onBoardPages[onboardStep]}
      <button onClick={handleNextClick}>
        {onboardStep < onBoardPages.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
}
