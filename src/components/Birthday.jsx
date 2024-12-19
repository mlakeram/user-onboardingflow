import PropTypes from 'prop-types';

export default function Birthday({
  birthday,
  setBirthday,
  highlightEmptyInput,
}) {
  return (
    <div id='birthdayContainer'>
      <label htmlFor='birthday'>Birthday: </label>
      <input
        type='date'
        id='birthdayInput'
        className={`inputBox ${
          highlightEmptyInput && !birthday ? 'emptyInput' : ''
        }`}
        onChange={(e) => setBirthday(e.target.value)}
      />
    </div>
  );
}

Birthday.propTypes = {
  setBirthday: PropTypes.func.isRequired,
  birthday: PropTypes.string,
  highlightEmptyInput: PropTypes.bool,
};
