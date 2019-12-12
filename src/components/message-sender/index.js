import sampleCombine from "xstream/extra/sampleCombine"

const intent = (sock, dom) => ({
  DOM: dom.source
    .events(dom.evt)
    .mapTo({
      type: dom.evt,
      payload: null
    })
    .startWith(null),
  input: sock.input.map(m => ({
    type: "message",
    payload: m
  })),
  socket: sock.source
})

const model = actions$ => ({
  message: actions$.DOM.compose(sampleCombine(actions$.input)),
  socket: actions$.socket.startWith({
    type: "init",
    payload: null
  })
})

const view = state$ =>
  state$.socket
    .map(() => state$.message)
    .flatten()
    .map(m => m[1])
    .remember()

/**
 *
 * @param {Object} sock: {
 *  input: stream$
 *  source: stream$
 * }
 * sock.input is the input for the message to send
 * sock.source is the socket to which the message is send
 * @param {Object} dom {
 *  source: stream$,
 *  evt: string
 * }
 * source is an already selected domSource (fE: DOM.select('.button'))
 * sock.evt is the event to listen to on the given domSource
 * @returns {Object} sinks {
 *  socket: stream$
 * }
 *
 */
const main = (sock, dom) => {
  const actions$ = intent(sock, dom)
  const state$ = model(actions$)
  const socket$ = view(state$)

  return {
    socket: socket$
  }
}

export default main
