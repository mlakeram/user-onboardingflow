import { useState, useEffect } from 'react';
const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

export default function Data() {
  const [userData, setUserData] = useState('');
  const [adminSettings, setAdminSettings] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      try {
        const data = await fetch(`${BACKEND_URL}/api/data`);
        const dataJSON = await data.json();
        setUserData(dataJSON);

        const settings = await fetch(`${BACKEND_URL}/api/adminsettings`);
        const settingsJSON = await settings.json();
        setAdminSettings(settingsJSON);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  if (isLoading) {
    return <div className='fetchingStatusMessage'>Loading Data</div>;
  }

  if (error) {
    return (
      <div className='fetchingStatusMessage'>
        Error fetching user data {error.message}
      </div>
    );
  }

  return (
    <div id='dataContainer'>
      <div id='userDataContainer'>
        <h2>User Data</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email Address</th>
              <th>Hashed Password</th>
              <th>About Me</th>
              <th>Birthday</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email_address}</td>
                <td>{user.password}</td>
                <td>{user.about_me}</td>
                <td>{new Date(user.birthday).toLocaleDateString()}</td>
                <td>{user.address_street}</td>
                <td>{user.address_city}</td>
                <td>{user.address_state}</td>
                <td>{user.address_zipcode}</td>
                <td>{user.address_country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id='adminSettingsContainer'>
        <h2>Admin Settings</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Component</th>
              <th>Page</th>
            </tr>
          </thead>
          <tbody>
            {adminSettings.map((setting) => (
              <tr key={setting.component}>
                <td>{setting.id}</td>
                <td>{setting.component}</td>
                <td>{setting.page}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
