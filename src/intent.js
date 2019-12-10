import LabeledSlider from "./components/labeled-slider"
import LabeledTextField from "./components/labeled-text-field"
import xs from "xstream"

const intent = (sources, props) => {
  const messageProps$ = xs.of(props.message)

  const radiusProps$ = xs.of(props.radius)

  return {
    radiusInput: LabeledSlider({
      DOM: sources.DOM,
      props: radiusProps$
    }),

    messageInput: LabeledTextField({
      DOM: sources.DOM,
      props: messageProps$
    }),

    socket: sources.socket
  }
}

export default intent
