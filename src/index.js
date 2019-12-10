import "./styles.css"
import { run } from "@cycle/run"
import { makeDOMDriver } from "@cycle/dom"
import makeSocketDriver from "./drivers/socket-io"
import view from "./view"
import intent from "./intent"
import model from "./model"
import sampleCombine from "xstream/extra/sampleCombine"

const main = sources => {
  const actions$ = intent(sources, {
    message: {
      label: "Message",
      value: ""
    },
    radius: {
      label: "Radius",
      unit: "px",
      min: 30,
      max: 250,
      value: 70
    }
  })

  const state$ = model(actions$)

  const vDom$ = view(state$)

  const click$ = sources.DOM.select(".message-send")
    .events("click")
    .mapTo({ type: "click", payload: null })
    .startWith(null)

  const msgval$ = state$.map(state => ({
    type: "message",
    payload: state.messageInputVal
  }))

  const message$ = click$.compose(sampleCombine(msgval$)).map(msg => {
    return msg[1]
  })

  const sockOut$ = sources.socket
    .startWith()
    .map(() => message$.map(msg => msg))
    .flatten()
    .startWith({
      type: "some",
      payload: ""
    })

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
