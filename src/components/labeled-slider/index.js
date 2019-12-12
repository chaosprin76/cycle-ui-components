import { div, label, input } from "@cycle/dom"
import styles from "./styles.styl"
import toLower from "ramda/es/toLower"

const intent = domSource =>
  domSource
    .select(".slider")
    .events("input")
    .map(e => e.target.value)

const model = (actions$, props$) =>
  props$
    .map(props =>
      actions$
        .map(val => ({
          label: props.label,
          unit: props.unit,
          min: props.min,
          max: props.max,
          value: val || props.value
        }))
        .startWith(props)
    )
    .flatten()
    .remember()

const view = state$ =>
  state$.map(state =>
    div(`.labeled-slider.${styles.labeledSlider}.${toLower(state.label)}`, [
      label(`${state.label}: ${state.value}`),
      input(".slider", {
        attrs: {
          type: "range",
          min: state.min,
          max: state.max,
          value: state.value
        }
      })
    ])
  )

const LabeledSlider = sources => {
  const actions$ = intent(sources.DOM)
  const state$ = model(actions$, sources.props)

  const vnode$ = view(state$)

  return {
    DOM: vnode$,
    value: state$.map(state => state.value)
  }
}

export default LabeledSlider
