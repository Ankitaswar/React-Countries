import React from 'react'

export default function SeletMenu({ setQuery }) {
    return (
        <select className="filter-by-region" id="countrySelect" onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}>
            <option hidden="">Filter By Region</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
            <option value="oceania">Americas</option>
        </select>
    )
}
