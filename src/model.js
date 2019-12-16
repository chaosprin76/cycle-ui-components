import xs from "xstream"

const bmiMsg = bmi => `My BMI is ${bmi}`

const model = actions$ => {
  const value$ = xs.merge(
    actions$.messageInput.value,
    actions$.bmiCalc.value.map(bmiMsg)
  )

  return xs
    .combine(
      actions$.messageInput.DOM,
      actions$.messageList.DOM,
      actions$.bmiCalc.DOM,
      value$
    )
    .map(([messageInputDOM, messageList, bmiCalc, value]) => {
      return {
        messageInputDOM,
        messageList,
        bmiCalc,
        value
      }
    })
}
export default model
