import React from "react"
import { useIntl } from "react-intl"

const ShareWithFriends = () => {
  const intl = useIntl()

  function createHtml() {
    return {
      __html: `
        <a href="javascript:copyTextToClipboard('https://beatcovid19now.org');" title="Copy link to clipboard">
          <i class="fa fa-link"></i>
        </a>
      `,
    }
  }

  return (
    <section className="share-section card is-info">
      <header>
        {intl.formatMessage({
          id: "web.tracker.share.header",
          defaultMessage: "Share with friends",
        })}
      </header>
      <div className="card-content">
        <p>
          {intl.formatMessage({
            id: "web.tracker.share.summary",
            defaultMessage:
              "Let’s spread this Symptom Tracker quicker than COVID-19 spreads. Share with your friends NOW.",
          })}
        </p>

        <div className="social-sharing">
          <a href="http://www.facebook.com/sharer.php?u=BeatCovid19now.org">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://twitter.com/intent/tweet?text=I%E2%80%99m%20helping%20to%20%23BeatCovid19Now%20by%20filling%20in%20the%20tracker%20at%20https://beatcovid19now.org%0A%0ATogether%20we%20are%20mapping%20the%20spread%20and%20symptoms%20of%20Covid-19,%20leading%20to%20better%20outcomes%20for%20all%20of%20us.%0A%0ATrack%20daily%20with%20me,%20whether%20you%20have%20symptoms%20or%20not,%20at%20https://beatcovid19now.org">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://beatcovid19now.org&summary=I%E2%80%99m%20helping%20to%20%23BeatCovid19Now%20by%20filling%20in%20the%20tracker%20at%20https://beatcovid19now.org%0A%0ATogether%20we%20are%20mapping%20the%20spread%20and%20symptoms%20of%20Covid-19,%20leading%20to%20better%20outcomes%20for%20all%20of%20us.%0A%0ATrack%20daily%20with%20me,%20whether%20you%20have%20symptoms%20or%20not,%20at%20https://beatcovid19now.org">
            <i className="fa fa-linkedin"></i>
          </a>
        </div>
        <div className="social-sharing">
          <a
            href="whatsapp://send?&text=I%27m+helping+%23BeatCovid19Now+by+completing+their+tracker.+Together+we+are+mapping+the+spread+and+symptoms+of+Covid19%2C+leading+to+better+outcomes+for+all+of+us.%0D%0AHelp+too+at+https%3A%2F%2Fbeatcovid19now.org"
            data-action="share/whatsapp/share"
          >
            <i className="fa fa-whatsapp"></i>
          </a>
          <span dangerouslySetInnerHTML={createHtml()} />

          <a href="mailto:?subject=BeatCOVID19Now&body=BeatCovid19Now by completeing their tracker. Together we are mapping the spread and symptoms of Covid19, leading to better outcomes for all of us. Help too at https://beatcovid19now.org">
            <i className="fa fa-envelope-square"></i>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ShareWithFriends
