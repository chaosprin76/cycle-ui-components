import { div, button, h1 } from "@cycle/dom"

const view = state$ => {
  return state$.map(state => {
    return div(".main", [
      h1("Weirdo chat"),
      state.messageInputDOM,
      button(".message-send", "send"),
      state.messageList,
      state.bmiCalc
    ])
  })
}
export default view
