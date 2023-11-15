import React, { useEffect, useState } from 'react'
import './styles.scss'
import Chartist from 'chartist'
import ChartistGraph from 'react-chartist'
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css'
import {Row} from 'react-bootstrap'
// Υπόμνημα είσοδος - έξοδος
import Legend from "chartist-plugin-legend";  

export default function SineWave(props, ) {
  const { frequency, voltages, value } = props

  const [plotData, setPlotData] = useState(null)
  const [plotOptions, setPlotOptions] = useState(null)
  const height ='23rem'

  //Χρονική κλίμακα (άξονας x - δημιουργία πολλών μικρών σημείων)
  const SAMPLES_AMOUNT = 50  
  const TIME_SCALE = 1000  
  var done = false
  
  useEffect(() => {
    const f = frequency
    const T = 1 / f
    // ορισμός διαστημάτων 
    const xAxisPoints = [0, T/4, T/2, 3*T/4, T] 
      .map(p => p * TIME_SCALE) // Κάνω τα 5 σημεία που δημιούργησα * TIME_SCALE για τη δημιουργία των σημείων
      .map(p => p.toFixed(0)) // Στον άξονα x στα σημεία έχουν μέχρι 3 δεκαδικά

    setPlotData({
      // Ορίζω τα σημεία , η πρώτη μεταβλητή που δημιουργώ είναι το null και η δεύτερη το t που ακριβώς από κάτω αλλάζει κάθε φορά
      series: voltages.map(V => [...Array(SAMPLES_AMOUNT)].map((_, t) => { 
        // Το time είναι η μεταβλητή που βοηθάει στη δημιουργία του x και y
        const time = t * (T / (SAMPLES_AMOUNT - 1))
        var y = V * Math.sin(2 * Math.PI * f * time)
        ///Η προηγούμενη έκδοση το σχόλιο
        // Αν η Vin <= Vout 
        //if (voltages[0] <= Math.abs(voltages[1])){
          // Αν η τιμή που προκύπτει στον άξονα y είναι μεγαλύτερη από την περιορισμένη τάση εξόδου, τότε να φτάνει μέχρι αυτήν
        if ((y > value) && (V == voltages[1])) {
          y = value;
          done = true
        }

        ///H προηγούμενη έκδοση
        // Το ίδιο με πάνω απλά για τις αρνητικές τιμές
        else if ((y < -value) && (V == voltages[1])){
          y=-value;
          done = true  
        } 
        //}
        return {
          x: time * TIME_SCALE,
          y: y
        }
      }))
    })

    // Εδώ παίρνω την μεγαλύτερη τάση
    var refVoltage = Math.max(...voltages.map(Math.abs)) 
    //Προηγούμενη έκδοση το σχόλιο
    //if (voltages[0] <= Math.abs(voltages[1])) 
    if (refVoltage > value && done) refVoltage = value

    setPlotOptions({
      plugins: [
        Legend({
            legendNames: ['Είσοδος', 'Έξοδος'],
            clickable: false
        })
      ],
      high: 1.01 * refVoltage,
      low: 1.01 * -refVoltage,
      showPoint: false,  // Για να μην δείχνει τα σημεία που δημιούργησα πάνω στην καμπύλη
      axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: xAxisPoints.length,
        ticks: xAxisPoints,
        stretch: true,
        labelInterpolationFnc: p => p + 'μs' // Προσθήκη των μονάδων μέτρησης πάνω στους άξονες 
      },
      axisY: {
        labelInterpolationFnc: p => p + 'V'
      }
    })
  }, [frequency, voltages])

  // Το plotData δεν είναι ποτέ null άρα πάντα εκτελείται η συνέχεια
  return <>
    { plotData && <> 
      <Row>
        <ChartistGraph style={{ height }} className='ct-octave' data={plotData} options={plotOptions} type='Line' />
      </Row>
    </> }
  </>
}

