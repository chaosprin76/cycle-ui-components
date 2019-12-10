import xs from "xstream"

/**
 *
 * @param {object} actions:
 *    radiusInput: {DOM: VDom$, value: Number$}
 *    messageInput: {DOM: VDOM$, value: Text$}
 *    messageSend: buttonClick$
 *    messageSocket: socketOutput$
 *
 * messageInput.value ---i---i---i--->
 *                        \   \   \
 * butonClick: ---------------------c----->
 *                                   \
 * socketInput$: ---------------------i--->
 *
 * @returns {Stream} socketInput$
 */

const socketInput = actions =>
  xs
    .combine(actions.messageInput.value, actions.messageSend)
    .map(([value, clickEvent]) => ({
      type: "Message",
      payload: value
    }))
    .map(msg => actions.messageSocket.map(() => msg))
    .flatten()
    .startWith(null)

const model = actions =>
  xs
    .combine(
      actions.radiusInput.DOM,
      actions.radiusInput.value,
      actions.messageInput.DOM,
      actions.messageInput.value,
      actions.socket
    )
    .map(
      ([radiusDOM, radiusVal, messageInputDOM, messageInputVal, socket]) => ({
        radiusDOM,
        radiusVal,
        messageInputDOM,
        messageInputVal,
        socket
      })
    )

export default model
