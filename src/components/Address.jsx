import PropTypes from 'prop-types';
export default function Address({ address, setAddress, highlightEmptyInput }) {
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
      <div id='addressInput1'>
        <input
          type='text'
          id='street'
          className={`inputBox ${
            highlightEmptyInput && !address.street ? 'emptyInput' : ''
          }`}
          name='street'
          value={address.street}
          placeholder='Street address'
          onChange={handleChange}
        />
      </div>
      <div id='addressInput2'>
        <input
          type='text'
          id='city'
          className={`inputBox ${
            highlightEmptyInput && !address.city ? 'emptyInput' : ''
          }`}
          name='city'
          value={address.city}
          placeholder='City'
          onChange={handleChange}
        />

        <input
          type='text'
          id='state'
          className={`inputBox ${
            highlightEmptyInput && !address.state ? 'emptyInput' : ''
          }`}
          name='state'
          value={address.state}
          placeholder='State'
          onChange={handleChange}
        />

        <input
          type='text'
          id='zip'
          className={`inputBox ${
            highlightEmptyInput && !address.zip ? 'emptyInput' : ''
          }`}
          name='zip'
          value={address.zip}
          placeholder='Zip'
          onChange={handleChange}
        />
      </div>
      <div id='addressInput3'>
        <input
          type='text'
          id='country'
          className={`inputBox ${
            highlightEmptyInput && !address.country ? 'emptyInput' : ''
          }`}
          name='country'
          value={address.country}
          placeholder='Country'
          onChange={handleChange}
        />
      </div>
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
  highlightEmptyInput: PropTypes.bool,
};
