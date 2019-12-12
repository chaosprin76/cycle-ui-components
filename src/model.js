import xs from "xstream"

const model = actions$ =>
  xs
    .combine(
      actions$.messageInput.DOM,
      actions$.messageInput.value,
      actions$.messageList.DOM,
      actions$.bmiCalc.DOM
    )
    .map(([messageInputDOM, messageInputVal, messageList, bmiCalc]) => {
      return {
        messageInputDOM,
        messageInputVal,
        messageList,
        bmiCalc
      }
    })

export default model
