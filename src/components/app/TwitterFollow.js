import ReactDOM from "react-dom"
import React, { Component } from "react"
import PropTypes from "prop-types"

export default class TwitterFollowButton extends Component {
  static get propTypes() {
    return {
      url: PropTypes.string,
    }
  }

  constructor(props) {
    super(props)
    this.state = { initalized: false }
  }

  componentDidMount() {
    this.init()
  }

  init() {
    if (this.state.initalized) {
      return
    }

    let twbutton = ReactDOM.findDOMNode(this.refs.twbutton)
    let twscript = document.createElement("script")
    twscript.src = "//platform.twitter.com/widgets.js"
    twscript.id = "twitter-js"
    twscript.onload = this.renderWidget.bind(this)
    twbutton.parentNode.appendChild(twscript)

    this.setState({ initalized: true })
  }

  componentWillUnmount() {
    let elem = document.getElementById("twitter-js")
    if (elem !== undefined) {
      elem.parentNode.removeChild(elem)
    }
  }

  renderWidget() {
    setTimeout(function() {
      if (window.twttr && window.twttr.widgets) {
        console.log(`load twitter`)
        window.twttr.widgets.load()
      }
    }, 1000)
  }

  render() {
    return (
      <a
        id="twbutton"
        ref="twbutton"
        className="twitter-follow-button"
        data-show-count="false"
        href={this.props.url}
      >
        {this.props.children}
      </a>
    )
  }
}
