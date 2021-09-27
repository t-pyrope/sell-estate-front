import React from 'react';
import map from '../assets/img/mapa.jpg'
import './map.css';
import regions from './regions';
import {
    Radio, FormLabel, FormControlLabel,
    FormControl, Grid, Button,
} from '@mui/material';

const estateTypes = ["Dům", "Pozemek"]

const FormEstate = (props) => {
    const {
        estateInfo, setEstateInfo, setActiveStep
    } = props;

    const onClick = (e, text) => {
        e.preventDefault();
        let r = regions.find((item) => item.title === text);
        setEstateInfo({ ...estateInfo, region: r, district: null, estateType: null })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setActiveStep(1);
    }

    const onChange = (e) => {
        const inputName = e.target.name;
        const value = e.target.value;
        if (inputName === "district") setEstateInfo({ ...estateInfo, district: value });
        if (inputName === "estateType") setEstateInfo({ ...estateInfo, estateType: value });
        return;

    }
    return(
        <>
            <h1>Kde se nachází vaše nemovitost?</h1>
            <p>Klikněte na kraj a následně vyberte okres</p>
            <div className="map">
                <img src={map} alt="Map with Czech Republic regions"/>
                <svg viewBox="0 7 2560 1615">
                    {
                        regions.map(r => 
                            <a href="" key={r.title} onClick={e => onClick(e, r.title)}>
                                <path
                                    className={`${r.title === estateInfo.region?.title ? "region_active" : ""} region`}
                                    d={r.d}
                                />
                            </a>
                        )
                    }
                </svg>
            </div>
            {
                estateInfo.region ?
                    <form onSubmit={(e) => onSubmit(e)}>
                        <FormControl component="fieldset" style={{ marginBottom: "1rem"}}>
                            <FormLabel component="legend">Vyberte okres</FormLabel>
                            <Grid container columns={{ xs: 3 }}>
                                {estateInfo.region.districts.map(district =>
                                    <Grid item key={district}>
                                        <FormControlLabel
                                            value={district}
                                            control={<Radio 
                                                checked={district === estateInfo.district}
                                            />}
                                            label={district}
                                            name="district"
                                            onChange={onChange}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </FormControl>
                        <FormControl component="fieldset" style={{ marginBottom: "1rem"}}>
                            <FormLabel component="legend">Vyberte typ nemovitosti</FormLabel>
                            <Grid container columns={{ xs: 3 }}>
                                {estateTypes.map(t =>
                                    <Grid item key={t}>
                                        <FormControlLabel
                                            value={t}
                                            control={<Radio
                                                checked={t === estateInfo.estateType}
                                            />}
                                            label={t}
                                            name="estateType"
                                            onChange={onChange}
                                        />
                                    </Grid>
                                )}
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
            : ''}
        </>
    )
}

export default FormEstate;
