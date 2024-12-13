import PropTypes from 'prop-types';
export default function Address({ address, setAddress }) {
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  return (
    <div id='addressContainer'>
      <input
        type='text'
        id='street'
        className='inputBox'
        name='street'
        value={address.street}
        placeholder='Street address'
        onChange={handleChange}
      />

      <input
        type='text'
        id='city'
        className='inputBox'
        name='city'
        value={address.city}
        placeholder='City'
        onChange={handleChange}
      />

      <input
        type='text'
        id='state'
        className='inputBox'
        name='state'
        value={address.state}
        placeholder='State'
        onChange={handleChange}
      />

      <input
        type='text'
        id='zip'
        className='inputBox'
        name='zip'
        value={address.zip}
        placeholder='Zip code'
        onChange={handleChange}
      />

      <input
        type='text'
        id='country'
        className='inputBox'
        name='country'
        value={address.country}
        placeholder='Country'
        onChange={handleChange}
      />
    </div>
  );
}

Address.propTypes = {
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  setAddress: PropTypes.func.isRequired,
};
