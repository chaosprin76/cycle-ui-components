import xs from "xstream"

const model = actions$ =>
  xs
    .combine(
      actions$.messageInput.DOM,
      actions$.messageInput.value,
      actions$.messageList.DOM
    )
    .map(([messageInputDOM, messageInputVal, messageList]) => {
      return {
        messageInputDOM,
        messageInputVal,
        messageList
      }
    })

export default model
