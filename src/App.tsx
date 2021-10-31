import React, { useEffect, useState } from 'react';
import {
  Switch, Route, useLocation, Redirect,
} from 'react-router-dom';
import { Card, Alert } from '@mui/material';

import HorizontalStepper from './components/HorizontalStepper';
import FormEstate from './components/FormEstate';
import FormContact from './components/FormContact';

const steps = ['Typ nemovitosti', 'Kontaktní informace'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [estateInfo, setEstateInfo] = useState({ region: '', district: '', estateType: '' });
  const [contacts, setContacts] = useState({ fullName: '', phone: '', email: '' });
  const [alert, setAlert] = useState({ text: '', isError: false });

  const location = useLocation();

  useEffect(() => {
    if (alert.text) {
      const timeout = setTimeout(() => { setAlert({ ...alert, text: '', isError: false }); }, 4000);
      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [alert]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, [activeStep]);

  return (
    <div className="App">
      <Switch location={location} key={location.pathname}>
        <Route path="/chci-nabidku" exact>
          <Card>
            {alert.text
              ? (
                <Alert
                  className="fade-out"
                  icon={false}
                  variant="filled"
                  severity={alert.isError ? 'error' : 'success'}
                >
                  {alert.text}
                </Alert>
              ) : ''}
            <HorizontalStepper
              activeStep={activeStep}
              steps={steps}
              setActiveStep={setActiveStep}
              finishedFirst={Boolean(estateInfo.district && estateInfo.estateType)}
            />
            {activeStep === 0
              && (
              <FormEstate
                estateInfo={estateInfo}
                setEstateInfo={setEstateInfo}
                setActiveStep={setActiveStep}
              />
              )}
            {activeStep === 1
              && (
              <FormContact
                estateInfo={estateInfo}
                setAlert={setAlert}
                setEstateInfo={setEstateInfo}
                setActiveStep={setActiveStep}
                contacts={contacts}
                setContacts={setContacts}
              />
              )}
          </Card>
        </Route>
        <Route
          render={() => <Redirect to="/chci-nabidku" />}
        />
      </Switch>
    </div>
  );
}

export default App;
