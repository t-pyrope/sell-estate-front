import React, { useEffect, useState } from 'react';
import {
  Radio, FormLabel, FormControlLabel,
  FormControl, Grid, Button,
} from '@mui/material';
import map from '../assets/img/mapa.jpg';
import './map.css';
import regions from './regions';
import { EstateInfoProps } from '../common/interfaces';

const estateTypes = ['Dům', 'Pozemek', 'Byt'];

interface FormEstateInterface {
  estateInfo: EstateInfoProps,
  setEstateInfo: (value: EstateInfoProps) => void,
  setActiveStep: (value: number) => void
}

interface ChosenRegionProps {
  title: string,
  districts: string[],
}

const FormEstate = ({ estateInfo, setEstateInfo, setActiveStep }: FormEstateInterface) => {
  const [chosenRegion, setChosenRegion] = useState<ChosenRegionProps>({ title: '', districts: [] });

  useEffect(() => {
    if (estateInfo.region) {
      const r = regions.find((item) => item.title === estateInfo.region);
      setChosenRegion({
        title: r!.title,
        districts: r!.districts,
      });
    }
  }, [estateInfo.region]);

  const onClick = (e: React.SyntheticEvent, text: string): void => {
    e.preventDefault();
    const r = regions.find((item) => item.title === text);
    setEstateInfo({
      ...estateInfo,
      region: r!.title,
      district: '',
      estateType: '',
    });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveStep(1);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const { value } = e.target;
    switch (inputName) {
      case 'district':
        setEstateInfo({ ...estateInfo, district: value });
        return;
      case 'estateType':
        setEstateInfo({ ...estateInfo, estateType: value });
        return;
      default:
        setEstateInfo({ ...estateInfo });
    }
  };
  return (
    <>
      <h1>Kde se nachází vaše nemovitost?</h1>
      <p>Klikněte na kraj a následně vyberte okres</p>
      <div className="map">
        <img src={map} alt="Map with Czech Republic regions" />
        <svg viewBox="0 7 2560 1615">
          { regions.map((r) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              href=""
              key={r.title}
              onClick={(e) => onClick(e, r.title)}
              aria-label={`Zvolit ${r.title}`}
            >
              <path
                className={`${r.title === estateInfo.region ? 'region_active' : ''} region`}
                d={r.d}
              />
            </a>
          ))}
        </svg>
      </div>
      { chosenRegion.districts.length
        ? (
          <form onSubmit={(e) => onSubmit(e)} className="form_estate">
            <FormControl component="fieldset">
              <FormLabel component="legend">Vyberte okres</FormLabel>
              <Grid container columns={{ xs: 3 }}>
                {chosenRegion.districts.map((district) => (
                  <Grid item key={district}>
                    <FormControlLabel
                      control={(
                        <Radio
                          checked={district === estateInfo.district}
                          name="district"
                          onChange={onChange}
                          value={district}
                        />
                      )}
                      label={district}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Vyberte typ nemovitosti</FormLabel>
              <Grid container columns={{ xs: 3 }}>
                {estateTypes.map((t) => (
                  <Grid item key={t}>
                    <FormControlLabel
                      control={(
                        <Radio
                          checked={t === estateInfo.estateType}
                          onChange={onChange}
                          name="estateType"
                          value={t}
                        />
                      )}
                      label={t}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormControl>
            <div>
              <Button
                variant="contained"
                type="submit"
                disabled={!(estateInfo.district && estateInfo.estateType)}
              >
                Pokračovat
              </Button>
            </div>
          </form>
        )
        : ''}
    </>
  );
};

export default FormEstate;
