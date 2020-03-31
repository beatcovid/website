import React, { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import { setLoading, setLocation, doSetLocation } from "./surveySlice"

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
      <div class="flex flex-col block">
        <p>Finding Location ...</p>
      </div>
    )
  }

  const google = window.google

  return (
    <div class="flex flex-col block">
      <span class="h-16 text-xl">Your Location</span>

      <span class="h-16 mb-6">
        We could not find your location. Please enter your suburb below.
      </span>

      <label class="block">
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
                class="mt-5 px-4 h-12 border border-silver w-full"
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div className="border-silver w-full mt-5 px-4">
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
        class="mt-8 h-12 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => dispatch(doSetLocation(geoLocation, next))}
      >
        Continue
      </button>
    </div>
  )
}

export default GetLocation
