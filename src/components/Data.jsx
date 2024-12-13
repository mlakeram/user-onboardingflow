import { useState, useEffect } from 'react';

export default function Data() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      try {
        const data = await fetch('http://localhost:3001/api/data');
        const dataJSON = await data.json();
        setUserData(dataJSON);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserData();
  }, []);

  if (isLoading) {
    return <div>Loading Data</div>;
  }

  if (error) {
    return <div>Error fetching user data {error.message}</div>;
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
    </div>
  );
}
