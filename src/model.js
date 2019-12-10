import xs from "xstream"
import { pre } from "@cycle/dom"

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
        .filter(msg => msg.type === "message")
        .fold((prev, msg) => {
          prev.push(msg)
          console.log(prev)
          return prev
        }, [])
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
