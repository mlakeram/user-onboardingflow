import PropTypes from 'prop-types';

export default function ProgressBar({ onBoardStep }) {
  const progressBars = [];

  for (let i = 0; i <= 2; i++) {
    let barStatus = '';

    if (i + 1 === onBoardStep) {
      barStatus = 'progressBarCurrent';
    } else if (i < onBoardStep - 1) {
      barStatus = 'progressBarCompleted';
    }

    const progressBar = (
      <div
        key={`progressbar${i + 1}`}
        className={`progressBar ${barStatus}`}
      ></div>
    );
    progressBars.push(progressBar);
  }

  return <div id='progressBarContainer'>{progressBars}</div>;
}

ProgressBar.propTypes = {
  onBoardStep: PropTypes.number,
};
