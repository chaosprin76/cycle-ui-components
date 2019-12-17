import LabeledTextField from "./components/labeled-text-field"
import xs from "xstream"
import MessageList from "./components/message-list"
import BmiCalc from "./components/bmi-calc"
import { Sources, MessageProps, Actions } from "./types"

type Props = {
  message: MessageProps
}

const intent = (sources: Sources, props: Props): Actions => {
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
