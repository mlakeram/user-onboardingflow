import PropTypes from 'prop-types';

export default function PageHeading({ onBoardStep, adminSettings }) {
  function createPageHeading() {
    if (onBoardStep === 1) {
      return 'Email & Password';
    }

    const pageTitles = {
      birthday: 'Birthday',
      address: 'Address',
      aboutMe: 'About Me',
    };

    let pageTitle = '';

    adminSettings
      .filter((setting) => setting.page === onBoardStep)
      .forEach((setting, idx) => {
        if (idx > 0) {
          pageTitle = `${pageTitle} & ${pageTitles[setting.component]}`;
        } else {
          pageTitle = pageTitles[setting.component];
        }
      });

    return pageTitle;
  }

  return <h3 id='pageHeading'>{createPageHeading()}</h3>;
}

PageHeading.propTypes = {
  onBoardStep: PropTypes.number,
  adminSettings: PropTypes.array,
};
