import { useState } from 'react';
import Birthday from './Birthday';
import AboutMe from './AboutMe';
import Address from './Address';
import Welcome from './Welcome';
import Credentials from './Credentials';

export default function Home() {
  const [onboardStep, setOnboardStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onBoardPages = [
    [
      <Credentials
        key='credentials'
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />,
    ],
    [<Birthday key='birthday' />, <AboutMe key='aboutme' />],
    [<Address key='address' />],
    [<Welcome key='welcome' />],
  ];

  function handleNextClick() {
    if (onboardStep < onBoardPages.length - 1) {
      setOnboardStep((onBoardStep) => onBoardStep + 1);
    }
    console.log(email, password);
  }

  return (
    <div id='onboardingPagesContainer'>
      {onBoardPages[onboardStep]}
      {onboardStep < onBoardPages.length - 1 ? (
        <button onClick={handleNextClick}>
          {onboardStep < onBoardPages.length - 2 ? 'Next' : 'Submit'}
        </button>
      ) : (
        ''
      )}
    </div>
  );
}
