import { Link } from 'react-router-dom';

export default function CountryCard({ name, flag, population, region, capital, data }) {
  return (
    <Link className="country-card" to={`/${name}`} state={{ data }}>
      <div className="flag-container">
        <img src={flag} alt={`${flag}-flag`} />
      </div>
      <div className="card-text">
        <h3 className="card-title">{name}</h3>
        <p className="card-para"><b>Population: </b>{population}</p>
        <p className="card-para"><b>Region: </b>{region}</p>
        <p className="card-para"><b>Capital: </b>{capital}</p>
      </div>
    </Link>
  );
}
