import React from "react"
import ImgClock from "../../assets/img/24hourclock.png"

const TrackDaily = () => {
  return (
    <section className="track-daily-section card is-info">
      <header>Keep tracking daily</header>
      <div className="card-content">
        <p>
          We learn more about COVID-19 every day you come back to use the
          Symptom Tracker.
        </p>

        <div className="clock-wrapper">
          <img src={ImgClock} alt="24 hour clock" />
        </div>

        <p>
          You can monitor your own health by coming back every day to see how
          your symptoms change over time. The questions in the Symptom Tracker
          may change as we learn more about COVID-19.
        </p>

        <p>
          Follow us on{" "}
          <a href="https://www.facebook.com/groups/453230132092365/">
            Facebook
          </a>{" "}
          or <a href="https://twitter.com/BeatCovid19Now">Twitter</a>
        </p>
      </div>
    </section>
  )
}

export default TrackDaily
