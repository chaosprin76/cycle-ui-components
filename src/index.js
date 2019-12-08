import "./styles.css"
import { run } from "@cycle/run"
import { makeDOMDriver, div } from "@cycle/dom"
import xs from "xstream"
import LabeledSlider from "./components/labeled-slider"
import CircleDiv from "./view-only-comps/circled-div"
import LabeledTextField from "./components/labeled-text-field"

const view = state$ =>
  state$.map(
    ([radiusInputValue, radiusInputDom, textFieldValue, textFieldDom]) =>
      div([
        radiusInputDom,
        textFieldDom,
        CircleDiv(radiusInputValue, "#ff00ff", textFieldValue)
      ])
  )

const RadiusInput = domSource => {
  const props$ = xs.of({
    label: "Radius",
    unit: "px",
    min: 10,
    max: 300,
    value: 100
  })

  return LabeledSlider({
    DOM: domSource,
    props: props$
  })
}

const ContentInput = domSources => {
  const props$ = xs.of({
    label: "Content",
    value: "more content"
  })

  return LabeledTextField({
    DOM: domSources,
    props: props$
  })
}

const main = sources => {
  const radiusInput = RadiusInput(sources.DOM)
  const contentInput = ContentInput(sources.DOM)
  console.log(contentInput)
  const state$ = xs.combine(
    radiusInput.value,
    radiusInput.DOM,
    contentInput.value,
    contentInput.DOM
  )
  const vDom$ = view(state$)

  return {
    DOM: vDom$
  }
}

const drivers = {
  DOM: makeDOMDriver("#app")
}

run(main, drivers)
