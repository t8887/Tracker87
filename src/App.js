import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { sortData, prettyPrintStat } from "./util";


import About1 from './About1'
import InfoBox from "./InfoBox";
import Table from './Table'
import LineGrapgh from './LineGraph'
import Map from './Map'

import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import "leaflet/dist/leaflet.css";



const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");



  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all')
      .then((res) => {
        setCountryInfo(res.data)
      })
  }, [])

  useEffect(() => {

    const getCountries = async () => {
      axios.get("https://disease.sh/v3/covid-19/countries")
        .then((res) => {
          const data = res.data;
          setMapCountries(data);
          const countries = data.map(e => ({
            country: e.country,
            value: e.countryInfo.iso2
          }))
          let sortedData = sortData(res.data)
          setCountries(countries)
          setMapCountries(res.data);
          setTableData(sortedData);
        })
    }
    getCountries();

  }, [])
  // console.log(casesType)


  const onCountryChange = async (e) => {
    let countryCode = e.target.value;

    const url = countryCode === 'worldwide' ?
      "https://disease.sh/v3/covid-19/all" :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await axios.get(url)
      .then(res => {
        // console.log('selected Country', res.data);
        setInputCountry(countryCode)
        setCountryInfo(res.data);
        setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long])
        setMapZoom(4)
      }
      )
  }


  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selected: {
      backgroundColor: "turquoise !important",
      color: "white",
      fontWeight: 400
    },
    select: {
      backgroundColor: "black !important",
      color: "white",
      fontWeight: 200
    }
  }));

  const classes = useStyles();




  return (
    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 Tracker</h1>
          <About1 />
          <FormControl className={classes.formControl} error>
            <InputLabel id="demo-simple-select-error-label">Select Country</InputLabel>

            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              value={country}
              onChange={onCountryChange}
              classes={{ select: classes.select }}
            >
              <MenuItem value='worldwide' classes={{ selected: classes.selected }}><em>Worldwide</em></MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.country} classes={{ selected: classes.selected }} value={country.value}><em>{country.country}</em></MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox
            onClick={(e) => { setCasesType('cases') }}
            title="Coronavirus Cases"
            isRed
            active={casesType === 'cases'}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered Cases"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths Cases"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table
            countries={tableData}
          />
          <h3>Worldwide new {casesType}</h3>
          <LineGrapgh casesType={casesType} />
        </CardContent>
      </Card>
    </div >
  );
}

export default App;
