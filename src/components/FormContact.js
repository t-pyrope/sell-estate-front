import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { TextField, Button, Box } from '@mui/material';
import EstatesDataService from '../services/estates';

const FormContact = (props) => {
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);

  const {
    estateInfo: { region, district, estateType }, estateInfo,
    setAlert, setActiveStep, setEstateInfo, setContacts,
    contacts,
  } = props;

  const validateError = (inputName, value) => {
    if (inputName === 'phone') {
      const regPhone = /([+]?\d{1,3}[. \s]?)?(\d{9}?)/;
      return !regPhone.test(value);
    }
    if (inputName === 'email') {
      const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
      return !regEmail.test(value);
    }
    return false;
  };

  const onChange = (e) => {
    const inputName = e.target.name;
    const { value } = e.target;
    switch (inputName) {
      case 'full-name':
        setContacts({ ...contacts, fullName: value });
        return;
      case 'phone':
        setContacts({ ...contacts, phone: value });
        setHasPhoneError(validateError(inputName, value));
        return;
      case 'email':
        setContacts({ ...contacts, email: value });
        setHasEmailError(validateError(inputName, value));
        return;
      default:
        setContacts({ ...contacts });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { fullName, phone, email } = contacts;

    EstatesDataService
      .createEstate({
        fullName,
        phone,
        email,
        estateType,
        region: region.title,
        district,
      }).then(() => {
        setAlert({
          text: 'Údaje byly úspěšně odeslány, brzy Vás budeme kontaktovat',
          color: 'success',
        });
        setContacts({
          ...contacts,
          fullName: '',
          email: '',
          phone: '',
        });
        setEstateInfo({
          ...estateInfo,
          region: null,
          district: null,
          estateType: null,
        });
        setActiveStep(0);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        setAlert({ text: 'Něco je špatně, zkuste prosím znovu', color: 'error' });
      });
  };

  return (
    <>
      <h1 className="contact-title">Kontaktní informace</h1>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 },
          '& div': { m: 1 },
        }}
        onSubmit={onSubmit}
      >
        <TextField
          required
          id="full-name"
          name="full-name"
          label="Jméno a příjmení"
          value={contacts.fullName}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="phone"
          name="phone"
          type="tel"
          label="Telefonní číslo"
          error={hasPhoneError}
          value={contacts.phone}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={hasPhoneError && 'Nesprávný formát'}
        />
        <TextField
          required
          id="email"
          name="email"
          type="email"
          label="Email"
          value={contacts.email}
          error={hasEmailError}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={hasEmailError && 'Nesprávný formát'}
        />
        <div>
          <Button
            variant="contained"
            type="submit"
            disabled={!(contacts.fullName && !hasPhoneError && !hasEmailError)}
          >
            Odeslat
          </Button>
        </div>
      </Box>
    </>
  );
};

FormContact.propTypes = {
  estateInfo: PropTypes.shape({
    region: PropTypes.string,
    district: PropTypes.string,
    estateType: PropTypes.string,
  }).isRequired,
  setAlert: PropTypes.func.isRequired,
  setActiveStep: PropTypes.isRequired,
  setEstateInfo: PropTypes.isRequired,
  setContacts: PropTypes.isRequired,
  contacts: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default FormContact;
