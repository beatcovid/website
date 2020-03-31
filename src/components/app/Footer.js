import React from "react"
import ImgNcris from "../../assets/img/logos/ncris.png"
import ImgArqGroup from "../../assets/img/logos/arq-group.png"
import ImgSwinburne from "../../assets/img/logos/swinburne-logo.gif"

const Footer = () => {
  const versionNumber = process.env.REACT_APP_VERSION || ''
  return (
    <div className="container has-text-centered">
      <div className="content is-size-7">
        This website has been developed by a team of public
        health and astrophysics/IT researchers and staff at
        <a href="https://www.swinburne.edu.au/" target="_blank" className="has-text-dark has-text-weight-bold">
          Swinburne University of Technology</a>
          in partnership with <a href="https://arq.group" target="_blank" className="has-text-dark has-text-weight-bold">Arq Group</a>,
          Australia and the COVID-19 Hackathon and marketing volunteers.
          This will help determine the current and emerging COVID-19 symptoms of
          people across the world. This will help you improve your understanding of your health,
          follow changes and help us to advise health authorities about what’s going on from the community’s perspective.
      </div>

      <a href="https://www.education.gov.au/national-collaborative-research-infrastructure-strategy-ncris" target="_blank">
        <img src={ImgNcris} alt="NCRIS Logo" />
      </a>
      <a href="https://www.swinburne.edu.au/" target="_blank">
        <img src={ImgArqGroup} alt="Swinburne Logo" />
      </a>
      <a href="https://arq.group/" target="_blank">
        <img src={ImgSwinburne} alt="Arq Group Logo" />
      </a>

      <h2>{versionNumber}</h2>
    </div>
  )
}

export default Footer
