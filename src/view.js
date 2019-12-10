import CircleDiv from "./view-only-comps/circled-div"
import { div, button, h1 } from "@cycle/dom"

const view = state$ => {
  return state$.map(state => {
    return div(".main", [
      h1("Weirdo chat"),
      state.radiusDOM,
      state.messageInputDOM,
      CircleDiv(state.radiusVal, "#f0f", state.messageInputVal),
      button(".message-send", "send"),
      div(".messages", [state.socket.payload])
    ])
  })
}
export default view
