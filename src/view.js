import { div, button, h1, header } from "@cycle/dom"

const view = state$ => {
  return state$.map(state => {
    return div(".main", [
      header(h1("Weirdo chat")),
      div(".message-sender", [
        state.messageInputDOM,
        button(".message-send", "send")
      ]),
      div(".bmi-calculator", [state.bmiCalc, button(".message-send", "Send")]),
      state.messageList
    ])
  })
}

export default view
