import { useState } from 'react';
import Birthday from './Birthday';
import AboutMe from './AboutMe';
import Address from './Address';
import Credentials from './Credentials';
import SubmitData from './SubmitData';

export default function Home() {
  const [onboardStep, setOnboardStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

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
    [
      <Birthday key='birthday' birthday={birthday} setBirthday={setBirthday} />,
      <AboutMe key='aboutme' aboutMe={aboutMe} setAboutMe={setAboutMe} />,
    ],
    [<Address key='address' address={address} setAddress={setAddress} />],
    [
      <SubmitData
        key='submitdata'
        email={email}
        password={password}
        birthday={birthday}
        aboutMe={aboutMe}
        address={address}
      />,
    ],
  ];

  function handleNextClick(event) {
    event.preventDefault();
    if (onboardStep < onBoardPages.length - 1) {
      setOnboardStep((onBoardStep) => onBoardStep + 1);
    }
    console.log(email, password);
    console.log(birthday);
    console.log(aboutMe);
    console.log(address);
  }

  return (
    <div id='onboardingPagesContainer'>
      {onBoardPages[onboardStep]}
      {onboardStep < onBoardPages.length - 1 ? (
        <button onClick={(e) => handleNextClick(e)}>
          {onboardStep < onBoardPages.length - 2 ? 'Next' : 'Submit'}
        </button>
      ) : (
        ''
      )}
    </div>
  );
}
