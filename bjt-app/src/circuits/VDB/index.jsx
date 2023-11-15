import React, { useEffect, useState } from 'react'
// Όταν θέλω να έχω images ή bit κειμένου
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Alert, Container } from 'react-bootstrap'
import Chartist from 'chartist'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css'
// Import το CircuitValueInput component
import CircuitValueInput from '../../components/circuit-value-input'
import VccValueSelector from '../../components/vcc-value-selector'
import circuitImg from './circuit.png'
import equalImg from './equal.png'
import '../../components/styles.scss'

// Δημιουργία αντικειμένου BJT_MODES που περιέχει τις τρεις καταστάσεις
const BJT_MODES = {
  AMP: 'Ενεργός',
  OUT: 'Λάθος λειτουργία'
}

// eslint disable γράφουμε για να αποφύγουμε τα warnings 
/* eslint-disable object-property-newline */
const INITIAL_OUTCOMES = {
  Vc: 0, Vb: 0, Ve: 0,
  Ic: 0, Ib: 0, Ie: 0,
  // default state η ενίσχυση
  bjtMode: BJT_MODES.AMP  
}

const INITIAL_EQUAL_OUTCOMES = {
  Vbb: 0, R1R2: 0,
  Vc: 0, Vb: 0, Ve: 0,
  Ic: 0, Ib: 0, Ie: 0
}

/* eslint-enable */
function calculateEqual (values) {
  const Vcc = parseFloat(values.Vcc)
  const R1 = parseFloat(values.R1)
  const R2 = parseFloat(values.R2)
  const Re = parseFloat(values.Re)
  const Rc = parseFloat(values.Rc)
  const h = parseFloat(values.β)
  

  /* eslint-disable prefer-const */

  let a = (h / (h + 1))
  let R1R2 = ((R1 * R2) / (R1 + R2)).toFixed()
  let Vbb = (R2 / (R1 + R2)) * Vcc
  let Ie = (Vbb - 0.7) / (Re + (R1R2 / h))
  let Ib = Ie / h
  let Ic = (a * Ie)
  let Vb = Vbb - (Ib * R1R2)
  let Ve = Vb - 0.7
  let Vc = Vcc - (Ic * Rc)
  let Vce = Vc - Ve

  /* eslint-enable */
  const outcomes = { Vbb, Vce, Vc, Vb, Ve, Ic: Ic * 1000, Ib: Ib * 1000, Ie: Ie * 1000, R1R2 }
  return outcomes
}

// Line 24-line 128 - συνδέει το Index.jsx με το app.js--επειδή είναι named export πρέπει να έχει το ίδιο όνομα με το import (Bjt)
export default function VDB () {   
  // Δίνω default τιμές με τη useState    
  const [values, setValues] = useState({  
    Vcc: 10,
    R1: 10_000,
    R2: 2_200,
    Re: 1_000,
    Rc: 3_600,
    β: 100
  })
  // Δίνω default τιμές με τη useState
  const [outcomes, setOutcomes] = useState(INITIAL_OUTCOMES) 
  const [equalOutcomes, setEqualOutcomes] = useState(INITIAL_EQUAL_OUTCOMES)
  const [plotData, setPlotData] = useState(null)
  
  const plotOptions = {
    axisX: {
      // υπολογίζει αυτόματα τις υποδιαιρέσεις
      type: Chartist.AutoScaleAxis,
      // μπορεί να βγάζει και δεκαδικά
      onlyInteger: false
    },
    // για να βγάζει τις βουλίτσες
    plugins: [
      ChartistTooltip({
        transformTooltipTextFnc: function(tooltip) {
          var ttip = tooltip.split(",");  // δημιουργεί καινούριο σημείο κάθε φορά που βρίσκει , (μετά το χ δηλαδή)
          return "Vce: " + ttip[0] + ", Ic: " + ttip[1]; }
      })
    ]
  }
  
  // Η useEffect τρέχει όποτε αλλάζουν τα values (γι' αυτό δηλώνουμε array με values στη setOutcomes)
  useEffect(() => {  
    // εδώ γίνονται οι υπολογισμοί
    const Vcc = parseFloat(values.Vcc)
    const R1 = parseFloat(values.R1)
    const R2 = parseFloat(values.R2)
    const Re = parseFloat(values.Re)
    const Rc = parseFloat(values.Rc)
    const h = parseFloat(values.β)

    /* eslint-disable prefer-const */
    let bjtMode = BJT_MODES.AMP
    let a = (h / (h + 1))
    let Ib = 0
    let Vb = (R2/(R1+R2)) * Vcc
    let Ve = Vb - 0.7
    let Ie = Ve / Re
    let Ic = (a * Ie)
    let Vc = Vcc - (Ic * Rc)
    let Vce = Vc - Ve

    // Παρακολουθούνται τα values και όταν αλλάζουν, αλλάζουν τα Outcomes
    const outcomes = { Vc, Vb, Ve, Vce, Ic: Ic * 1000, Ib: Ib * 1000, Ie: Ie * 1000, bjtMode }
    setOutcomes({ INITIAL_OUTCOMES, ...outcomes })
    // Με το outcomes γίνονται override οι μεταβλητές (για το Ve που είναι πάντα 0)

    /* eslint-enable */
    const equalOutcomes = calculateEqual(values)
    setEqualOutcomes({ INITIAL_EQUAL_OUTCOMES, ...equalOutcomes })
    
    const IcSat = (Vcc / (Rc + Re)) * 1000

    // ένα array μέσα στο series οπότε μόνο ένα γράφημα
    setPlotData({
      series: [[
        { meta: 'Ic(sat)', x: 0, y: IcSat.toFixed(2) },
        { meta: 'Q', x: Vce.toFixed(2), y: (Ic * 1000).toFixed(2) },
        { meta: 'Vce(cutoff)', x: Vcc, y: 0 }
      ]],
    })
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

    {
      (outcomes.Vc < outcomes.Vb || outcomes.Vb < outcomes.Ve || outcomes.Vc < outcomes.Ve) &&
      (outcomes.bjtMode = BJT_MODES.OUT)
    }    

    {
      (outcomes.Vc < 0 || outcomes.Vb < 0 || outcomes.Ve < 0 || outcomes.Ic < 0 || outcomes.Ib < 0 || outcomes.Ie < 0 ) &&
      (outcomes.bjtMode = BJT_MODES.OUT)
    }
    
    // Στα disabled πεδία δεν χρειάζομαι setValues γιατί δεν χρειάζεται να πειράζω την τιμή τους 
    // {plotData && <ChartistGraph listener={{ draw: plotDrawHandler }} style={{ height: '16rem' }} className='ct-octave' data={plotData} options={plotOptions} type='Line' />}
    // Eλέγχω άν υπάρχουν plot data--> του λέω να αντικαθιστά τα σημεία με τις βούλες στο listener--> του δίνω τη συνάρτηση στο listener
    return (
      <Card className='mx-auto'>
        <Card.Body>
          <Row className='mb-3'>
            <Col xs={3}>
              <img style={{ float: 'initial' }} src={circuitImg} alt='' />
            </Col>
            <Col xs={5}>
              <img style={{ float: 'initial', maxWidth: '100%' }} src={equalImg} alt='' />
            </Col>
            <Col xs={4}>
              {plotData && <ChartistGraph style={{ height: '16rem' }} className='ct-vdbchart' data={plotData} options={plotOptions} type='Line' />}
            </Col>
          </Row>
  
          <Container>
            <Row>
              <Col>
              {
              (outcomes.Vc < outcomes.Vb || outcomes.Vb < outcomes.Ve || outcomes.Vc < outcomes.Ve) &&
              (<Alert className='text-center' variant='danger'><div style={{ fontSize: '160%' }}><b>Δεν ισχύει Vc {'>'} Vb {'>'} Ve... Κύκλωμα εκτός ενεργού περιοχής... Παρακαλώ ξαναεισάγετε τιμές</b></div></Alert>)
              }
  
              </Col>
            </Row>
  
              <Col> 
              {
              (outcomes.bjtMode == BJT_MODES.AMP) && 
              (
                (((equalOutcomes.R1R2) < (0.01 * (values.β) * (values.Re))) && 
                (<Alert className='text-center' variant='success'><div style={{ fontSize: '160%' }}><b>Πολύ σταθερός διαιρέτης τάσης</b></div></Alert>)) ||
  
                (((equalOutcomes.R1R2) < (0.1 * (values.β) * (values.Re))) && 
                (<Alert className='text-center' variant='info'><div style={{ fontSize: '130%' }}><b>Σταθερός διαιρέτης τάσης</b></div></Alert>))
              )
              }
              </Col>
              {
              (outcomes.Vc < 0 || outcomes.Vb < 0 || outcomes.Ve < 0 || outcomes.Ic < 0 || outcomes.Ib < 0 || outcomes.Ie < 0 ) &&
              (<Alert className='text-center' variant='danger'><div style={{ fontSize: '160%' }}><b>Αρνητική τάση ή ρεύμα</b></div></Alert>)
              }
              <Col>
              
              </Col>
  
          </Container>
        
          <Row>
            <Col xs={6}>
              <div style={{ textAlign: 'center' }}>Κύκλωμα Πόλωσης διαιρέτη τάσης</div>
              <div>
                <VccValueSelector x = {false} values={values} setValues={setValues} name='Vcc' measurement='V' options={[ 5, 10, 12, 15, 18, 20, 24 ]} />
                <CircuitValueInput values={values} setValues={setValues} name='R1' measurement='Ω' measurements={measurementsR} min={10} max={1_000000} />
                <CircuitValueInput values={values} setValues={setValues} name='R2' measurement='Ω' measurements={measurementsR} min={10} max={1_000000} />
                <CircuitValueInput values={values} setValues={setValues} name='Re' measurement='Ω' measurements={measurementsR} min={10} max={1_000000} />
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
                <CircuitValueInput values={outcomes} name='bjtMode' label='Περιοχή λειτουργίας' measurement='' allowLower disabled shouldBlink={outcomes['bjtMode'] !== BJT_MODES.AMP} />
              </div>
            </Col>
            <Col xs={6}>
              <div style={{ textAlign: 'center' }}>Ισοδύναμο Κύκλωμα {'(Με Rth)'}</div>
              <VccValueSelector values={values} setValues={setValues} name='Vcc' measurement='V' options={[ 5, 10, 12, 15, 18, 20, 24 ]} disabled />
              <CircuitValueInput values={equalOutcomes} name='Vbb' measurement='V' disabled fixed />
              <CircuitValueInput values={equalOutcomes} name='R1R2' label='R1//R2' measurements={measurementsR} disabled />
              <CircuitValueInput values={values} setValues={setValues} name='Re' measurements={measurementsR} min={10} max={1_000000} disabled/>
              <CircuitValueInput values={values} setValues={setValues} name='Rc' measurements={measurementsR} min={10} max={1_000000} disabled/>
              <CircuitValueInput values={values} setValues={setValues} name='β' measurement='' min={50} max={300} allowLower disabled/>
              <div style={{ textAlign: 'center'}}>Υπολογισμοί</div>
              <CircuitValueInput values={equalOutcomes} name='Vc' measurement='V' disabled fixed />
              <CircuitValueInput values={equalOutcomes} name='Vb' measurement='V' disabled fixed />
              <CircuitValueInput values={equalOutcomes} name='Ve' measurement='V' disabled fixed />
              <CircuitValueInput values={equalOutcomes} name='Ic' measurements={measurementsIb} disabled fixed />
              <CircuitValueInput values={equalOutcomes} name='Ib' measurements={measurementsIb} disabled fixed />
              <CircuitValueInput values={equalOutcomes} name='Ie' measurements={measurementsIb} disabled fixed /> 
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}

VDB.image = circuitImg // Για να το συνδέσω με το App και να μπορεί να χρησιμοποιηθεί και εκεί ($.image line 51--App.js)

// Αν δεν είχα το allowLower θα εμφανιζόταν ένα μικρότερο h, είναι για τα κεφαλαία στο Vc κ.τ.λ.

