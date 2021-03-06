import React from "react"
import { FormattedMessage } from "react-intl"
import ImgNcris from "../../assets/img/logos/ncris.png"
import ImgArqGroup from "../../assets/img/logos/arq-group.png"
import ImgSwinburne from "../../assets/img/logos/swinburne-logo.gif"

const Acknowledgement = () => {
  return (
    <footer className="site-footer container">
      <div className="is-size-7">
        <FormattedMessage
          id="web.acknowledgement"
          defaultMessage={`This website has been developed by a team of public health and
            astrophysics/IT researchers and staff at <swinlink>Swinburne University of
            Technology</swinlink> in partnership with <arqlink>Arq Group</arqlink>, Australia
            and the COVID-19 Hackathon and marketing volunteers. This
            will help determine the current and emerging COVID-19 symptoms of people
            across the world. This will help you improve your understanding of your
            health, follow changes and help us to advise health authorities about
            what’s going on from the community’s perspective.`}
          values={{
            swinlink: (...p) => (
              <a
                href="https://www.swinburne.edu.au/"
                rel="noopener noreferrer"
                target="_blank"
                className="has-text-dark has-text-weight-bold"
              >
                {p}
              </a>
            ),
            arqlink: (...p) => (
              <a
                href="https://arq.group"
                rel="noopener noreferrer"
                target="_blank"
                className="has-text-dark has-text-weight-bold"
              >
                {p}
              </a>
            ),
          }}
        />
      </div>

      <section className="logos">
        <a
          href="https://www.education.gov.au/national-collaborative-research-infrastructure-strategy-ncris"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={ImgNcris} alt="NCRIS Logo" />
        </a>
        <a
          href="https://www.swinburne.edu.au/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ImgSwinburne} alt="Swinburne Logo" />
        </a>
        <a href="https://arq.group/" target="_blank" rel="noopener noreferrer">
          <img src={ImgArqGroup} alt="Arq Group Logo" />
        </a>
      </section>
    </footer>
  )
}

export default Acknowledgement
