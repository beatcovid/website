import React, { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import { setLocation, doSetLocation } from "../../store/surveySlice"

const GetLocation = ({ next }) => {
  const dispatch = useDispatch()
  const [isFinding, setIsFinding] = useState(true)
  const [triedGeolocating, setTriedGeolocating] = useState(false)
  const [address, setAddress] = useState("")
  const [geoLocation, setGeoLocation] = useState("")

  const handleSelect = address => {
    setAddress(address)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setGeoLocation(latLng))
      .catch(error => console.error("Error", error))
  }

  const getLocation = useCallback(
    async () =>
      await navigator.geolocation.getCurrentPosition(
        position => {
          setIsFinding(false)

          dispatch(
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          )
          // next()
        },
        err => {
          console.error(err)
          setIsFinding(false)
          setTriedGeolocating(true)
        },
      ),
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("5 second location search timeout")
      setIsFinding(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!triedGeolocating) {
      getLocation()
    }
  }, [getLocation, dispatch, triedGeolocating])

  if (isFinding) {
    return (
      <div className="">
        <p>Finding Location ...</p>
      </div>
    )
  }

  const google = window.google

  return (
    <div className="">
      <span className="">Your Location</span>

      <span className="">
        We could not find your location. Please enter your suburb below.
      </span>

      <label className="">
        <PlacesAutocomplete
          value={address}
          onChange={a => setAddress(a)}
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
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                className=""
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div className="">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item"
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </label>

      <button
        className=""
        onClick={() => dispatch(doSetLocation(geoLocation, next))}
      >
        Continue
      </button>
    </div>
  )
}

export default GetLocation
