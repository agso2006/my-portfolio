import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import CircuitValueInput from '../../components/circuit-value-input'
import VccValueSelector from '../../components/vcc-value-selector'
import SineWave from '../../components/sine-wave'
import Pulse from '../../components/pulse'
import circuitImg from './circuit.png'
import { Alert } from 'react-bootstrap'

/* eslint-disable object-property-newline */
const INITIAL_OUTCOMES = {
  Vout: 0, Acl: 0, Fcl: 0, diff: 0  
}
/* eslint-enable */

export default function Non_Inverting_Amplifierr (props) {   

  const { opt } = props
    
  const [values, setValues] = useState({  
    Vin: 0.05,
    Vcc: 12, 
    Vee: -12,
    R1: 1_000,
    Rf: 1,
    f:  1,
    sr: 0.5,
    field: 0
  })
  
  const [outcomes, setOutcomes] = useState(INITIAL_OUTCOMES) 

  useEffect(() => {  
    const Vin = parseFloat(values.Vin)
    const R1 = parseFloat(values.R1)
    const Rf = parseFloat(values.Rf)
    const f = parseFloat(values.f)
    /* eslint-disable prefer-const */

    let Acl = 1 + (Rf / R1)
    let Vout = Acl * Vin
    let Fcl = ((1000000 / Acl)).toFixed()
    let Av1 = 0
    let Av2 = 0

    if (f < Fcl){
      Vout = Acl * Vin
    }
    
    if (f === Fcl){
      Av1 = (0.707 * Acl)
      Vout = Av1 * Vin
    }
    
    if (f > Fcl){
      Av2 = (Acl / Math.sqrt(1 + Math.pow((f / Fcl), 2)))
      Vout = Av2 * Vin
    }

    const diff = parseFloat(values.Vcc) - parseFloat(values.field)

    /* eslint-enable */
    const outcomes = { Vout, Acl, Fcl, diff}
    setOutcomes({...outcomes })
  }, [values])
    
    const measurementsV = [        
      {
        symbol: 'V',
        restore: v => v,             
        render: v => v
      },
      {
        symbol: 'mV',
        restore: v => parseFloat(v) / 1000,   
        render: v => parseFloat(v) * 1000     
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

    const measurementsF = [
      {
        symbol: 'kHz',
        restore: v => parseFloat(v) * 1000,   
        render: v => parseFloat(v) / 1000
      },
      {
        symbol: 'Hz',
        restore: v => v,
        render: v => v
      },
      {
        symbol: 'MHz',
        restore: v => parseFloat(v) * 1000000,   
        render: v => parseFloat(v) / 1000000
      }
    ]

    var bool = true
    var x = outcomes.Vout
    //αν το vout βγει εκτός ορίων τότε το bool γίνεται false (θα χρειαστεί για το blink) και το x η μέγιστη επιτρεπτή τιμή που θα σταλεί για τα γραφήματα
    if (outcomes.Vout > outcomes.diff) {bool=false; x = outcomes.diff}

     return (
      <Card className='mx-auto'>
        <Card.Body>
        <Row className='mb-3'>
                   
            <Col xs={3}>
              <img style={{ width: '220%', height: '90%'}} src={circuitImg} alt='' />
            </Col> 

            <Col xs={3} />
            
              {opt === 0 ? // Ανάλογα με την τιμή του opt στο οποίο αποθηκεύεται το κουμπί καλείται η συνάρητηση
              <Col xs={5}>
                <SineWave frequency={values.f} voltages={[values.Vin, outcomes.Vout]} value={Math.abs(x)} />
              </Col> :
              <Col xs={3}>
                <Pulse sr={values.sr} frequency={values.f} voltages={[values.Vin, x ]} /> 
              </Col> }  
          </Row>
          <Row>
            <Col>
              {
                (bool? null : 
                <Alert className='text-center' variant='warning'><div style={{ fontSize: '160%' }}><b>Η έξοδος του ενισχυτή στο διάγραμμα περιορίζεται από την τάση τροφοδοσίας!!!</b></div></Alert>) 
              }
            </Col>
          </Row>

          <Row> 
            <Col style={{ textAlign: 'center' }}>Μη αναστρέφων ενισχυτής </Col> 
          </Row>
          
          <Row>

            <Col>
              <VccValueSelector x = {true} values={values} setValues={setValues} name='Vcc' measurement='V' options={[ 10, 12, 15, 20, 24, 30 ]} />
              <div style={{ textAlign: 'center' }}> Διαφορά κορεσμού εξόδου από την τάση τροφοδοσίας (V) </div>
              <VccValueSelector values={values} setValues={setValues} name='field' options={[ 0, 0.5, 1, 2]} />
              <CircuitValueInput values={values} setValues={setValues} name='Vin' measurement='V' measurements={measurementsV} min={0.001} max={10} />
              <CircuitValueInput values={values} setValues={setValues} name='R1' measurement='Ω' measurements={measurementsR} min={100} max={1_000000} />
              <CircuitValueInput values={values} setValues={setValues} name='Rf' measurement='Ω' measurements={measurementsR} min={100} max={1_000000} />
              <VccValueSelector values={values} setValues={setValues} name='f' measurement='kHz' measurements={measurementsF} options={[ 1, 5, 10]} />
              {opt === 1 ? <VccValueSelector values={values} setValues={setValues} name='sr' measurement='V/μs' options={[ 0.5, 1, 2]} /> : <></>}
            </Col>

            <Col>
              
              <CircuitValueInput values={outcomes} name='Vout' measurements={measurementsV} disabled fixed shouldBlink = {!bool} />
              <CircuitValueInput values={outcomes} name='Acl' measurement='' disabled />
              <CircuitValueInput values={outcomes} name='Fcl' measurements={measurementsF} disabled />
             
              <div style={{ textAlign: 'center' }}> Περιορισμένη τάση εξόδου </div>
              <CircuitValueInput values={outcomes} name="diff" measurements={measurementsV} measurement='V' disabled />
            </Col> 

          </Row>
        </Card.Body>
      </Card>
    )
}

Non_Inverting_Amplifierr.image = circuitImg 