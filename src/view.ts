import { div, button, h1, header, VNode } from "@cycle/dom"
import { State$ } from "./types"
import { Stream } from "xstream"

const view = (state$: State$): Stream<VNode> => {
  return state$.map(state => {
    return div(".main", [
      header(h1("Weirdo chat")),
      div(".message-sender", [
        state.messageInputDOM,
        button(".message-send", "send")
      ]),
      div(".bmi-calculator", [
        state.bmiCalcDOM,
        button(".message-send", "Send")
      ]),
      state.messageListDOM
    ])
  })
}

export default view
