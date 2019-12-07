import "./styles.css"
import { run } from "@cycle/run"
import { makeDOMDriver, div } from "@cycle/dom"
import xs from "xstream"
import LabeledSlider from "./components/labeled-slider"
import CircleDiv from "./view-only-comps/circled-div"

const view = state$ =>
  state$.map(([value, childVDom]) =>
    div([childVDom, CircleDiv(value, "#ff00ff", "hello world")])
  )

const main = sources => {
  const props$ = xs.of({
    label: "Radius",
    unit: "px",
    min: 10,
    max: 300,
    value: 100
  })

  const rangeSlider = LabeledSlider({
    DOM: sources.DOM,
    props: props$
  })

  const childVDom$ = rangeSlider.DOM
  const childValue$ = rangeSlider.value
  const state$ = xs.combine(childValue$, childVDom$)
  const vDom$ = view(state$)

  return {
    DOM: vDom$
  }
}

const drivers = {
  DOM: makeDOMDriver("#app")
}

run(main, drivers)
