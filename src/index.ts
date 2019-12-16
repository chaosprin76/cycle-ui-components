import "./styles.css"
import { run } from "@cycle/run"
import { makeDOMDriver, DOMSource, VNode } from "@cycle/dom"
import makeSocketDriver from "./drivers/socket-io"
import view from "./view"
import intent from "./intent"
import model from "./model"
import MessageSender from "./components/message-sender"
import { Stream, MemoryStream } from "xstream"

const MESSAGE_PROPS = {
  label: "Message",
  value: ""
}

type Sources = {
  DOM: DOMSource
  socket: object
  value: Stream<object>
}

type Sinks = {
  DOM: Stream<VNode>
  socket: Stream<any>
}

const sockOut = <T>(state$: Stream<any>, sources: any): MemoryStream<T> =>
  MessageSender(
    {
      input: state$.map(state => state.value),
      source: sources.socket
    },
    {
      source: sources.DOM.select(".message-send"),
      evt: "click"
    }
  ).socket.remember()

const main = (sources: any): Sinks => {
  const actions$ = intent(sources, {
    message: MESSAGE_PROPS
  })

  const state$ = model(actions$)
  const sockOut$ = sockOut(state$, sources)
  const vDom$ = view(state$)

  return {
    DOM: vDom$,
    socket: sockOut$
  }
}

const drivers = {
  DOM: makeDOMDriver("#app"),
  socket: makeSocketDriver("https://z5pnf.sse.codesandbox.io/messenger")
}

run(main, drivers)
