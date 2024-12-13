import PropTypes from 'prop-types';

export default function AboutMe({ aboutMe, setAboutMe }) {
  return (
    <div id='aboutMeContainer'>
      {/* <label htmlFor='aboutMe'>About Me:</label> */}
      <textarea
        id='aboutMe'
        className='inputBox'
        value={aboutMe}
        placeholder='About me'
        onChange={(e) => setAboutMe(e.target.value)}
      />
    </div>
  );
}

AboutMe.propTypes = {
  aboutMe: PropTypes.string,
  setAboutMe: PropTypes.func.isRequired,
};
