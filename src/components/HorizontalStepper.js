import React from 'react';
import {
    Stepper, Step, StepLabel, Button
} from '@mui/material';

const HorizontalStepper = ({ steps, activeStep, setActiveStep, finishedFirst }) => {
    const onClick = () => {
        activeStep === 0 ? setActiveStep(1) : setActiveStep(0)
    }

    return(
        <div className="flex-row">
        <Button
                onClick={onClick}
                disabled={activeStep === 0}
            >
                ←
            </Button>
        <Stepper activeStep={activeStep}>
            {steps.map(label =>
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            )}
        </Stepper>
        <Button
                disabled={!finishedFirst}
                onClick={onClick}
            >
                →
            </Button>
        </div>
    )
}

export default HorizontalStepper;