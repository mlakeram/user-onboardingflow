import { useState } from 'react';
import OnboardPages from './OnboardingPages';

export default function Home() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const authenticationPrompt = [
    <button key='loginbtn' onClick={() => {}}>
      Login
    </button>,
    <button
      key='signupbtn'
      onClick={() => {
        setIsSigningUp(true);
      }}
    >
      Sign Up
    </button>,
  ];

  return (
    <div id='appContainer'>
      {isSigningUp ? <OnboardPages /> : authenticationPrompt}
    </div>
  );
}
