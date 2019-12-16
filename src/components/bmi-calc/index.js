import xs from "xstream"
import LabeledSlider from "../labeled-slider"
import { div, h2 } from "@cycle/dom"
import isolate from "@cycle/isolate"

const WeightSlider = isolate(LabeledSlider, "weight")
const HeightSlider = isolate(LabeledSlider, "height")

const BmiCalc = domSources => {
  const weightProps$ = xs.of({
    label: "Weight",
    unit: "kg",
    min: 40,
    max: 200,
    value: 103
  })
  const heightProps$ = xs.of({
    label: "Height",
    unit: "kg",
    min: 130,
    max: 220,
    value: 189
  })

  const weightSources = { DOM: domSources, props: weightProps$ }
  const heightSources = { DOM: domSources, props: heightProps$ }

  const weightSlider = WeightSlider(weightSources)
  const heightSlider = HeightSlider(heightSources)

  const bmi$ = xs
    .combine(weightSlider.value, heightSlider.value)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01
      return Math.round(weight / (heightMeters * heightMeters))
    })
    .remember()

  const vdom$ = xs
    .combine(bmi$, weightSlider.DOM, heightSlider.DOM)
    .map(([bmi, weightDom, heightDom]) =>
      div([weightDom, heightDom, h2(`Your BMI: ${bmi}`)])
    )

  return {
    DOM: vdom$,
    value: bmi$
  }
}

export default BmiCalc
