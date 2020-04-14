import React from "react"
import { useLocation } from "react-router-dom"

const NoMatchPage = () => {
  const { pathname } = useLocation()

  return <h1>{pathname} not found.</h1>
}

export default NoMatchPage
