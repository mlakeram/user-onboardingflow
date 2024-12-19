import PropTypes from 'prop-types';

export default function AboutMe({ aboutMe, setAboutMe, highlightEmptyInput }) {
  return (
    <div id='aboutMeContainer'>
      <textarea
        id='aboutMe'
        className={`inputBox ${
          highlightEmptyInput && !aboutMe ? 'emptyInput' : ''
        }`}
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
  highlightEmptyInput: PropTypes.bool,
};
