import LabeledTextField from "./components/labeled-text-field"
import xs from "xstream"
import MessageList from "./components/message-list"
import BmiCalc from "./components/bmi-calc"

const intent = (sources, props) => {
  const messageProps$ = xs.of(props.message)
  const messageList = MessageList(sources.socket)
  const bmiCalc = BmiCalc(sources.DOM)

  return {
    messageInput: LabeledTextField({
      DOM: sources.DOM,
      props: messageProps$
    }),
    messageList,
    bmiCalc
  }
}

export default intent
