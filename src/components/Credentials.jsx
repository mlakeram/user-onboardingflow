import PropTypes from 'prop-types';
export default function Credentials({
  email,
  password,
  setEmail,
  setPassword,
}) {
  return (
    <form>
      <div>
        <input
          type='email'
          id='email'
          className='inputBox'
          value={email}
          placeholder='Email address'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type='password'
          id='password'
          className='inputBox'
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
};
