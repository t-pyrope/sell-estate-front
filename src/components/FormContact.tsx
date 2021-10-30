import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import {
  AlertProps, EstateInfoProps, ContactsProps,
} from '../common/interfaces';
import EstatesDataService from '../services/estates';

interface FormContactProps {
  estateInfo: EstateInfoProps,
  setAlert: (value: AlertProps) => void,
  setEstateInfo: (value: EstateInfoProps) => void,
  setActiveStep: (value: number) => void,
  contacts: ContactsProps,
  setContacts: (value: ContactsProps) => void
}

const FormContact = ({
  estateInfo, setAlert, setEstateInfo,
  setActiveStep, contacts, setContacts,
}: FormContactProps) => {
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);

  const { region, district, estateType } = estateInfo;

  const validateError = (inputName: string, value: string): boolean => {
    if (inputName === 'phone') {
      // regex from https://regex101.com/library/sI9bU6
      const regPhone = /^(\+?420)?(2[0-9]{2}|3[0-9]{2}|4[0-9]{2}|5[0-9]{2}|72[0-9]|73[0-9]|77[0-9]|60[1-8]|56[0-9]|70[2-5]|79[0-9])[0-9]{3}[0-9]{3}$/;
      return !regPhone.test(value);
    }
    if (inputName === 'email') {
      const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
      return !regEmail.test(value);
    }
    return false;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { fullName, phone, email } = contacts;

    EstatesDataService
      .createEstate({
        fullName,
        phone,
        email,
        estateType,
        region,
        district,
      }).then(() => {
        setAlert({
          ...alert,
          text: 'Údaje byly úspěšně odeslány, brzy Vás budeme kontaktovat',
          isError: false,
        });
        setContacts({
          ...contacts,
          fullName: '',
          email: '',
          phone: '',
        });
        setEstateInfo({
          ...estateInfo,
          region: '',
          district: '',
          estateType: '',
        });
        setActiveStep(0);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        setAlert({
          ...alert,
          text: 'Něco je špatně, zkuste prosím znovu',
          isError: true,
        });
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

export default FormContact;
