import React from "react"
import { useIntl, FormattedMessage } from "react-intl"
import ImgClock from "../../assets/img/24hourclock.png"
import { Link } from "react-router-dom"

const TrackDaily = () => {
  const intl = useIntl()

  return (
    <section className="track-daily-section card is-info">
      <header>
        {intl.formatMessage({
          id: "web.tracker.daily.header",
          defaultMessage: "Come back soon",
        })}
      </header>
      <div className="card-content">
        <p>
          {intl.formatMessage({
            id: "web.tracker.daily.learn",
            defaultMessage:
              "We learn more about COVID-19 every time you come back.",
          })}
        </p>

        <div className="clock-wrapper">
          <img src={ImgClock} alt="24 hour clock" />
        </div>

        <p>
          {intl.formatMessage({
            id: "web.tracker.daily.monitor",
            defaultMessage:
              "You can monitor your own health by coming back every day to see how your symptoms change over time. The questions in the Symptom Tracker may change as we learn more about COVID-19.",
          })}
        </p>

        <p>
          <FormattedMessage
            id="web.tracker.daily.calendarlink"
            defaultMessage="View your daily progress using the <trackerlink>calendar</trackerlink>"
            values={{
              trackerlink: (...p) => <Link to={"/calendar"}>{p}</Link>,
            }}
          />
        </p>

        <p>
          <FormattedMessage
            id="web.tracker.daily.follow"
            defaultMessage="Follow our research and updates on <facebook>Facebook</facebook> or <twitter>Twitter</twitter>"
            values={{
              facebook: (...p) => (
                <Link to={"https://www.facebook.com/groups/453230132092365/"}>
                  {p}
                </Link>
              ),
              twitter: (...p) => (
                <Link to={"https://twitter.com/BeatCovid19Now"}>{p}</Link>
              ),
            }}
          />
        </p>
      </div>
    </section>
  )
}

export default TrackDaily
