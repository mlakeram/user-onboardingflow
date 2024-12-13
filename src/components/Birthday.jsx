import PropTypes from 'prop-types';

export default function Birthday({ setBirthday }) {
  return (
    <div id='birthdayContainer'>
      <label htmlFor='birthday'>Birthday: </label>
      <input
        type='date'
        id='birthday'
        className='inputBox'
        onChange={(e) => setBirthday(e.target.value)}
      />
    </div>
  );
}

Birthday.propTypes = {
  setBirthday: PropTypes.func.isRequired,
};
