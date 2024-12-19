import PropTypes from 'prop-types';
export default function Credentials({
  email,
  password,
  setEmail,
  setPassword,
  highlightEmptyInput,
}) {
  return (
    <form>
      <div>
        <input
          type='email'
          id='emailInput'
          value={email}
          className={`inputBox ${
            highlightEmptyInput && !email ? 'emptyInput' : ''
          }`}
          placeholder='Email address'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type='password'
          id='passwordInput'
          className={`inputBox ${
            highlightEmptyInput && !password ? 'emptyInput' : ''
          }`}
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </form>
  );
}

Credentials.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  highlightEmptyInput: PropTypes.bool,
};
