import React, { useEffect, useState } from 'react'
import './CountryDetail.css'
import { Link, useLocation, useParams } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

export default function CountryDetail() {
  const [isDark] = useTheme();
  console.log(isDark);

  function updateCountryData(data) {
    setCountryData({
      flag: data.flags.svg,
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population.toLocaleString('en-IN'),
      region: data.region,
      subRegion: data.subregion,
      capital: data.capital?.join(', '),
      domain: data.tld,
      currency: Object.values(data.currencies || {}).map((currency) => currency.name).join(','),
      language: Object.values(data.languages || {}).join(', '),
      borders: []
    });

    if (data.borders && data.borders.length > 0) {
      Promise.all(
        data.borders.map(border =>
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(resp => resp.json())
            .then(([borderCountry]) => borderCountry.name.common)


        )
      ).then((borders) => {
        setTimeout(() => {
          setCountryData((prevState) => ({ ...prevState, borders: borders }))
        })
      });
    }
  }

  const params = useParams()
  const countryName = params.country
  const { state } = useLocation();

  const [countryData, setCountryData] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {

    if (state) {
      updateCountryData(state.data)
      return
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((resp) => resp.json())
      .then(([data]) => {
        console.log(data);
        updateCountryData(data);
      })
      .catch(err => {
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return <div style={{ fontSize: 23, fontWeight: 'bold', textAlign: 'center', color: 'red' }}>Something Went Wrong: Country Not Found</div>;
  } else {
    return (
      countryData === null ? 'Loading....' : (
        <main className={`main ${isDark ? 'dark' : ''}`}>
          <div className="country-detail-container">
            <span className="back-button" onClick={() => history.back()}><i className="fa-solid fa-arrow-left" aria-hidden="true"></i>&nbsp; Back</span>
            <div className="country-details">
              <img alt="flag" src={countryData.flag} />
              <div className="details-text">
                <h1>{countryData.name}</h1>
                <div className="details-text-container">
                  <p><b>Native Name: </b><span className="native-name">{countryData.nativeName || countryData.name}</span></p>
                  <p><b>Population: </b><span className="population">{countryData.population}</span></p>
                  <p><b>Region: </b><span className="region">{countryData.region}</span></p>
                  <p><b>Sub-Region: </b><span className="sub-region">{countryData.subRegion}</span></p>
                  <p><b>Capital: </b><span className="capital">{countryData.capital}</span></p>
                  <p><b>Top Level Domain: </b><span className="domain">{countryData.domain}</span></p>
                  <p><b>Currency: </b><span className="currency">{countryData.currency}</span></p>
                  <p><b>Languages: </b><span className="language">{countryData.language}</span></p>
                </div>
                {countryData.borders && countryData.borders.length > 0 && (
                  <div className="border-countries">
                    <b>Border Countries: &nbsp;</b>
                    {
                      countryData.borders.map((border, index) => (
                        <Link key={index} to={`/${border}`}>
                          {border}
                        </Link>

                      ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
      )
    )
  }
}
