import React, { useEffect, useState } from 'react'
// Όταν θέλω να έχω images ή bit κειμένου
import Card from 'react-bootstrap/Card'
// Import το CircuitValueInput component
import CircuitValueInput from '../../components/circuit-value-input'
import circuitImg from './circuit.png'
import VccValueSelector from '../../components/vcc-value-selector'

// Δημιουργία αντικειμένου BJT_MODES που περιέχει τις τρεις καταστάσεις
const BJT_MODES = { 
  AMP: 'Ενεργός',
  CUT: 'Αποκοπή',
  SAT: 'Κορεσμός'
}

/* eslint-disable object-property-newline */
const INITIAL_OUTCOMES = {
  Vc: 0, Vb: 0, Ve: 0,
  Ic: 0, Ib: 0, Ie: 0,
  // default state η ενίσχυση
  bjtMode: BJT_MODES.AMP  
}
/* eslint-enable */

// Line 24-line 128 - συνδέει το Index.jsx με το app.js--επειδή είναι named export πρέπει να έχει το ίδιο όνομα με το import (Bjt)
export default function Bjt () {   
  // Δίνω default τιμές με τη useState    
  const [values, setValues] = useState({  
    Vbb: 2,
    Vcc: 10,
    Rb: 20_000,
    Rc: 1_000,
    β: 100
  })
  // Δίνω default τιμές με τη useState
  const [outcomes, setOutcomes] = useState(INITIAL_OUTCOMES) 

  // Η useEffect τρέχει όποτε αλλάζουν τα values (γι' αυτό δηλώνουμε array με values στη setOutcomes)
  useEffect(() => {  
    // εδώ γίνονται οι υπολογισμοί
    const Vbb = parseFloat(values.Vbb)
    const Vcc = parseFloat(values.Vcc)
    const Rb = parseFloat(values.Rb)
    const Rc = parseFloat(values.Rc)
    const h = parseFloat(values.β)
    /* eslint-disable prefer-const */

    let bjtMode = BJT_MODES.AMP

    let Ib = (Vbb - 0.7) / Rb
    if ((Ib <= 0) && (Vbb < 0.7)) {
      Ib = 0
      bjtMode = BJT_MODES.CUT
    }

    let Ic = 0
    let Vc = Vcc
    let Vb = Vbb - (Ib * Rb)

    if (bjtMode === BJT_MODES.AMP) {
      Ic = Ib * h
      Vc = Vcc - (Ic * Rc)

      if (Vc <= Vb) {
        Vc = 0.3
        Vb = 0.7
        Ic = (Vcc - Vc) / Rc
        bjtMode = BJT_MODES.SAT
      }
    }

    let Ie = (Ib + Ic)
    /* eslint-enable */
    
    // Παρακολουθούνται τα values και όταν αλλάζουν, αλλάζουν τα outcomes
    const outcomes = { Vc, Vb, Ic: Ic * 1000, Ib: Ib * 1000, Ie: Ie * 1000, bjtMode }
    setOutcomes({ ...INITIAL_OUTCOMES, ...outcomes }) // Με το outcomes γίνονται override οι μεταβλητές (για το Ve που είναι πάντα 0)
  }, [values])
    
    // array μέσω του οποίου θα γίνεται η αλλαγή από mA σε μΑ
    const measurementsIb = [        
      {
        // default τιμές
        symbol: 'mA',
        restore: v => v,             
        render: v => v
      },
      {
        symbol: 'μA',
        restore: v => parseFloat(v) / 1000,   // εδώ στην ουσία γίνεται επαναφορά σε mA
        render: v => parseFloat(v) * 1000     // εδώ γίνεται render σε μΑ
      }
    ]

    const measurementsR = [
      {
        symbol: 'kΩ',
        restore: v => parseFloat(v) * 1000,   
        render: v => parseFloat(v) / 1000
      },
      {
        symbol: 'Ω',
        restore: v => v,
        render: v => v
      },
      {
        symbol: 'MΩ',
        restore: v => parseFloat(v) * 1000000,   
        render: v => parseFloat(v) / 1000000
      }
    ]

    // Στα disabled πεδία δεν χρειάζομαι setValues γιατί δεν χρειάζεται να πειράζω την τιμή τους 
    return (
      <Card className='mx-auto' style={{ width: '36rem' }}>
        <Card.Body>
          <div className='mb-3'>
            <img style={{ width: '100%', height: '100%' }} src={circuitImg} alt='' />
          </div>
          <div style={{ textAlign: 'center' }}>Κύκλωμα πόλωσης βάσης</div>
          <div>
            <VccValueSelector x = {false} values={values} setValues={setValues} name='Vcc' measurement='V' options={[ 5, 10, 12, 15, 18, 20, 24 ]}  />
            <CircuitValueInput values={values} setValues={setValues} name='Vbb' measurement='V' min={0.5} max={values.Vcc} />
            <CircuitValueInput values={values} setValues={setValues} name='Rb' measurement='Ω' measurements={measurementsR} min={10} max={1_000000} />
            <CircuitValueInput values={values} setValues={setValues} name='Rc' measurement='Ω' measurements={measurementsR} min={10} max={1_000000} />
            <CircuitValueInput values={values} setValues={setValues} name='β' measurement='' min={50} max={300} allowLower />
          </div>
          <div>
            <div style={{ textAlign: 'center'}}>Υπολογισμοί</div>
            <CircuitValueInput values={outcomes} name='Vc' measurement='V' disabled fixed />
            <CircuitValueInput values={outcomes} name='Vb' measurement='V' disabled fixed />
            <CircuitValueInput values={outcomes} name='Ve' measurement='V' disabled fixed />
            <CircuitValueInput values={outcomes} name='Ic' measurements={measurementsIb} disabled fixed />
            <CircuitValueInput values={outcomes} name='Ib' measurements={measurementsIb} disabled fixed />
            <CircuitValueInput values={outcomes} name='Ie' measurements={measurementsIb} disabled fixed />
            <CircuitValueInput values={outcomes} name='bjtMode' label='Περιοχή λειτουργίας' measurement='' allowLower disabled />
          </div>
        </Card.Body>
      </Card>
    )
}


Bjt.image = circuitImg // Για να το συνδέσω με το App και να μπορεί να χρησιμοποιηθεί και εκεί ($.image line 51--App.js)

// Αν δεν είχα το allowLower θα εμφανιζόταν ένα μικρότερο h, είναι για τα κεφαλαία στο Vc κ.τ.λ.