import xs from "xstream"
import { Actions, State$, State } from "./types"

const bmiMsg = (bmi: Number): String => `My BMI is ${bmi}`

const model = (actions$: Actions): State$ => {
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
    .map(
      (p): State => {
        return {
          messageInputDOM: p[0],
          messageListDOM: p[1],
          bmiCalcDOM: p[2],
          value: p[3]
        }
      }
    )
}
export default model
