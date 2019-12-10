import CircleDiv from "./view-only-comps/circled-div"
import { div, button, h1, ul, li } from "@cycle/dom"

const view = state$ => {
  return state$.map(state => {
    return div(".main", [
      h1("Weirdo chat"),
      state.radiusDOM,
      state.messageInputDOM,
      CircleDiv(state.radiusVal, "#f0f", state.messageInputVal),
      button(".message-send", "send"),
      ul(state.socket.map(msg => li(msg.payload)))
    ])
  })
}
export default view
