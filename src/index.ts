import "./styles.css"
import { run } from "@cycle/run"
import { makeDOMDriver } from "@cycle/dom"
import makeSocketDriver from "./drivers/socket-io"
import view from "./view"
import intent from "./intent"
import model from "./model"
import MessageSender from "./components/message-sender"
import { MemoryStream } from "xstream"
import { Sinks, Sources, MessageProps, State$ } from "./types"

const MESSAGE_PROPS: MessageProps = {
  label: "Message",
  value: ""
}

const sockOut = <T>(state$: State$, sources: Sources): MemoryStream<T> =>
  MessageSender(
    {
      input: state$.map(state => state.value),
      source: sources.socket
    },
    {
      source: sources.DOM.select(".message-send"),
      evt: "click"
    }
  ).socket

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
