import React, { useState, useEffect } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"

const Geopoint = props => {
  const name = props.name || ""
  const label = props.label || ""
  const value = props.value || ""
  const required = props.required || false
  const errorMessage = props.errorMessage || ""

  const google = window.google
  const [address, setAddress] = useState("")
  const [geoLocation, setGeoLocation] = useState(null)
  const [error, setError] = useState(false)

  function labelClasses() {
    const baseClass = "label"
    return error ? `${baseClass} has-text-danger` : baseClass
  }
  function inputClasses() {
    const baseClass = "input"
    return error ? `${baseClass} is-danger` : baseClass
  }
  function suggestionClasses(active) {
    const baseClass = "suggestion-item"
    return active ? `${baseClass} is-active` : baseClass
  }
  function controlClasses(loading) {
    const baseClass = "control"
    return loading ? `${baseClass} is-loading` : baseClass
  }

  function handleChange(address) {
    setAddress(address)
    setGeoLocation(null)
  }

  function handleSelect(address) {
    setAddress(address)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setGeoLocation(latLng))
      .catch(error => console.error("Error", error))
  }

  useEffect(() => {
    console.log(geoLocation)
  }, [geoLocation])

  return (
    <div className="survey-geopoint field">
      <label className={labelClasses()}>{label}</label>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(113.338953078, -43.6345972634),
            new google.maps.LatLng(153.569469029, -10.6681857235),
          ),
          types: ["geocode"],
          strictBounds: true,
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={controlClasses(loading)}>
            <input
              {...getInputProps({
                placeholder: "Search",
                className: "input",
              })}
            />
            {suggestions.length > 0 && (
              <div className="places-suggestions">
                {suggestions.map(suggestion => {
                  const className = suggestionClasses(suggestion.active)
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>

      {error && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default Geopoint
