import React from 'react';
import PropTypes from 'prop-types';
import {
  Stepper, Step, StepLabel, IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HorizontalStepper = ({
  steps, activeStep, setActiveStep, finishedFirst,
}) => {
  const onClick = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  };

  return (
    <div className="flex-row">
      <IconButton
        onClick={onClick}
        disabled={activeStep === 0}
        aria-label="back"
        color="primary"
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <IconButton
        disabled={!(finishedFirst && activeStep === 0)}
        onClick={onClick}
        color="primary"
        aria-label="forward"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

HorizontalStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  finishedFirst: PropTypes.bool.isRequired,

};

export default HorizontalStepper;
