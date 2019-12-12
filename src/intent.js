import LabeledTextField from "./components/labeled-text-field"
import xs from "xstream"
import MessageList from "./components/message-list"

const intent = (sources, props) => {
  const messageProps$ = xs.of(props.message)
  const messageList = MessageList(sources.socket)

  return {
    messageInput: LabeledTextField({
      DOM: sources.DOM,
      props: messageProps$
    }),
    messageList
  }
}

export default intent
