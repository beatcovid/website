import React, { useState, useMemo } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"

const Geopoint = props => {
  const google = window.google
  const name = props.name || ""
  const label = props.label || ""
  const value = props.value || ""
  const errorMessage = props.errorMessage || ""
  const valid = props.valid
  const stepInteracted = props.stepInteracted
  const [interacted, setInteracted] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [geoLocation, setGeoLocation] = useState(null)
  const addressValue = useMemo(() => {
    return value && value.name ? value.name : ""
  }, [value])

  const showError = useMemo(() => {
    return !valid && (stepInteracted || interacted)
  }, [valid, stepInteracted, interacted])
  const labelClasses = useMemo(() => {
    const baseClass = "label"
    return showError ? `${baseClass} has-text-danger` : baseClass
  }, [showError])

  function suggestionClasses(active) {
    const baseClass = "suggestion-item"
    return active ? `${baseClass} is-active` : baseClass
  }
  function controlClasses(loading) {
    const baseClass = "control"
    return loading ? `${baseClass} is-loading` : baseClass
  }

  function getGeopointObj(address, geocode) {
    return {
      name: address,
      geo: geocode,
    }
  }

  function handleChange(address) {
    props.onChange(getGeopointObj(address, null))
  }

  function handleSelect(address) {
    geocodeByAddress(address)
      .then(results => {
        props.onChange(getGeopointObj(address, results[0]))
        return getLatLng(results[0])
      })
      .then(latLng => {
        setGeoLocation(latLng)
      })
      .catch(error => console.error("Error", error))
      .then(() => setInteracted(true))
  }

  return (
    <div className="survey-geopoint field">
      <label className={labelClasses} dangerouslySetInnerHTML={label} />
      <PlacesAutocomplete
        value={addressValue}
        onChange={handleChange}
        onSelect={handleSelect}
        highlightFirstSuggestion={true}
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
                name,
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

      {showError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  )
}

export default Geopoint
