import { useState, useEffect } from 'react';

export default function AdminSettings() {
  const [birthdayPage, setBirthdayPage] = useState(null);
  const [aboutMePage, setAboutMePage] = useState(null);
  const [addressPage, setAddressPage] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const settings = await fetch(
          'https://useronboardingapi.vercel.app/api/adminsettings'
        );
        const settingsJSON = await settings.json();

        setBirthdayPage(
          settingsJSON.filter((setting) => setting.component === 'birthday')[0]
            .page
        );

        setAboutMePage(
          settingsJSON.filter((setting) => setting.component === 'aboutMe')[0]
            .page
        );

        setAddressPage(
          settingsJSON.filter((setting) => setting.component === 'address')[0]
            .page
        );
      } catch (error) {
        setLoadingError(error);
      }
    };

    getUserData();
  }, []);

  function saveSettings() {
    setSavedMessage('');

    const submitSettings = async () => {
      try {
        await fetch('https://useronboardingapi.vercel.app/api/adminsettings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ birthdayPage, aboutMePage, addressPage }),
        });

        setSavedMessage('Settings saved');
        setTimeout(() => setSavedMessage(''), 2000);
      } catch (error) {
        setLoadingError(error);
      }
    };
    submitSettings();
  }

  if (loadingError) {
    return (
      <div className='fetchingStatusMessage'>Error loading saved settings</div>
    );
  }

  return (
    <div id='adminContainer'>
      <div className='adminSetting'>
        <label htmlFor='birthday'>
          <h4>Birthday:</h4>
          <input
            type='radio'
            name='birthday'
            className='inputBox'
            value={2}
            checked={birthdayPage === 2}
            onChange={(e) => setBirthdayPage(parseInt(e.target.value, 10))}
          />
          <h5>Page 2</h5>
          <input
            type='radio'
            name='birthday'
            className='inputBox'
            value={3}
            checked={birthdayPage === 3}
            onChange={(e) => setBirthdayPage(parseInt(e.target.value, 10))}
          />
          <h5>Page 3</h5>
        </label>
      </div>
      <div className='adminSetting'>
        <label htmlFor='aboutMe'>
          <h4>About Me:</h4>
          <input
            type='radio'
            name='aboutMe'
            className='inputBox'
            value={2}
            checked={aboutMePage === 2}
            onChange={(e) => setAboutMePage(parseInt(e.target.value, 10))}
          />
          <h5>Page 2</h5>
          <input
            type='radio'
            name='aboutMe'
            className='inputBox'
            value={3}
            checked={aboutMePage === 3}
            onChange={(e) => setAboutMePage(parseInt(e.target.value, 10))}
          />
          <h5>Page 3</h5>
        </label>
      </div>
      <div className='adminSetting'>
        <label htmlFor='address'>
          <h4>Address:</h4>
          <input
            type='radio'
            name='address'
            className='inputBox'
            value={2}
            checked={addressPage === 2}
            onChange={(e) => setAddressPage(parseInt(e.target.value, 10))}
          />
          <h5>Page 2</h5>
          <input
            type='radio'
            name='address'
            className='inputBox'
            value={3}
            checked={addressPage === 3}
            onChange={(e) => setAddressPage(parseInt(e.target.value, 10))}
          />
          <h5>Page 3</h5>
        </label>
      </div>
      {[birthdayPage, aboutMePage, addressPage].includes(2) &&
        [birthdayPage, aboutMePage, addressPage].includes(3) && (
          <button onClick={saveSettings}>Save</button>
        )}
      <div id='notification'>{savedMessage}</div>
    </div>
  );
}
