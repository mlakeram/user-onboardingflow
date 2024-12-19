import React, { useEffect, useState } from 'react';
import Birthday from './Birthday';
import AboutMe from './AboutMe';
import Address from './Address';
import Credentials from './Credentials';
import SubmitData from './SubmitData';
import ProgressBar from './ProgressBar';
import PageHeading from './PageHeading';
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// console.log(process.env.NODE_ENV);

export default function Home() {
  const [onboardStep, setOnboardStep] = useState(1);
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
  const [adminSettings, setAdminSettings] = useState([]);
  const [error, setError] = useState('');

  // console.log(BACKEND_URL);
  // console.log(process.env.NODE_ENV);

  useEffect(() => {
    const getAdminSettings = async () => {
      try {
        const settings = await fetch(
          'https://useronboardingapi.vercel.app/api/adminsettings'
        );
        const settingsJSON = await settings.json();
        setAdminSettings(() => settingsJSON);
      } catch (error) {
        setError(error);
      }
    };

    getAdminSettings();
  }, []);

  const onBoardingPages = {
    credentials: (
      <Credentials
        key='credentials'
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    ),
    birthday: (
      <Birthday key='birthday' birthday={birthday} setBirthday={setBirthday} />
    ),
    aboutMe: (
      <AboutMe key='aboutme' aboutMe={aboutMe} setAboutMe={setAboutMe} />
    ),
    address: (
      <Address key='address' address={address} setAddress={setAddress} />
    ),
    submitData: (
      <SubmitData
        key='submitdata'
        email={email}
        password={password}
        birthday={birthday}
        aboutMe={aboutMe}
        address={address}
      />
    ),
  };

  function handleNextClick(event) {
    event.preventDefault();
    if (onboardStep < 4) {
      setOnboardStep((onBoardStep) => onBoardStep + 1);
    }
  }

  if (error) {
    return (
      <div className='fetchingStatusMessage'>
        Error fetching settings {error.message}
      </div>
    );
  }

  return (
    <div id='homeContainer'>
      <ProgressBar onBoardStep={onboardStep} />
      <div id='onboardingPagesContainer'>
        <PageHeading onBoardStep={onboardStep} adminSettings={adminSettings} />
        <div id='pageContainer'>
          {adminSettings
            .filter((setting) => setting.page === onboardStep)
            .map((setting, idx, arr) => (
              <React.Fragment key={setting.component}>
                {onBoardingPages[setting.component]}
                {setting.page < 4 && idx === arr.length - 1 && (
                  <button onClick={(e) => handleNextClick(e)}>
                    {setting.page < 3 ? 'Next' : 'Submit'}
                  </button>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}
