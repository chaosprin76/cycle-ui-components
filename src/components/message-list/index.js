import { ul, li } from "@cycle/dom"

const model = socket$ =>
  socket$
    .filter(msg => msg.type === "message")
    .map(m => m.payload)

    .fold((prev, msg) => {
      prev.push(msg)
      return prev
    }, [])

const view = state$ =>
  state$.map(state => ul(".messages", state.map(msg => li(".message", msg))))

const main = sources => {
  const state$ = model(sources)
  const vdom$ = view(state$)

  return {
    DOM: vdom$,
    socket: sources
  }
}

export default main
