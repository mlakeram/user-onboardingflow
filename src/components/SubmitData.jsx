import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SubmitData({
  email,
  password,
  birthday,
  aboutMe,
  address,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.table(email, password, birthday, aboutMe, address);

  useEffect(() => {
    const submitUserData = async () => {
      setIsLoading(true);
      try {
        await fetch('http://localhost:3001/api/submituser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, birthday, aboutMe, address }),
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    submitUserData();
  }, []);

  console.log('render');

  if (isLoading) {
    return <div>Saving data</div>;
  }

  if (error) {
    return <div>Error saving user data {error.message}</div>;
  }

  return <div id='tosContainer'>Thank you for signing up!</div>;
}

SubmitData.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  birthday: PropTypes.string,
  aboutMe: PropTypes.string,
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
};