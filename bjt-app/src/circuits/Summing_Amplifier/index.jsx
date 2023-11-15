import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import CircuitValueInput from '../../components/circuit-value-input'
import VccValueSelector from '../../components/vcc-value-selector'
import circuitImg from './circuit.png'
import { Alert } from 'react-bootstrap'

/* eslint-disable object-property-newline */
const INITIAL_OUTCOMES = {
  Vout: 0, Acl: 0, diff: 0 
}
/* eslint-enable */

export default function Summing_Amplifier () { 
  
  const [values, setValues] = useState({  
    Vcc: 12,
    Vee: -12,
    V1: 0.10,
    V2: 0.20,
    R1: 20_000,
    R2: 10_000,
    Rf: 100_000,
    field: 0
  })
  
  const [outcomes, setOutcomes] = useState(INITIAL_OUTCOMES) 

  useEffect(() => {  
    const V1 = parseFloat(values.V1)
    const V2 = parseFloat(values.V2)
    const R1 = parseFloat(values.R1)
    const R2 = parseFloat(values.R2)
    const Rf = parseFloat(values.Rf)
    /* eslint-disable prefer-const */

    let Ac1 = -(Rf / R1)
    let Ac2 = -(Rf / R2)
    let Vout = ((Ac1 * V1) + (Ac2 * V2))

    const diff = parseFloat(values.Vcc) - parseFloat(values.field)

    /* eslint-enable */
    const outcomes = { Vout, Ac1, Ac2, diff}
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

    var bool = true
    //αν το vout βγει εκτός ορίων τότε το bool γίνεται false (θα χρειαστεί για το blink) και το x η μέγιστη επιτρεπτή τιμή που θα σταλεί για τα γραφήματα
    if (outcomes.Vout < -outcomes.diff || outcomes.Vout > outcomes.diff) {bool=false;}

     return (
      <Card className='mx-auto' style={{ width: '36rem' }}>
        <Card.Body>
          <div className='mb-3'>
            <img style={{ width: '100%', height: '100%' }} src={circuitImg} alt='' />
          </div>
          <div style={{ textAlign: 'center' }}>Αθροιστικός ενισχυτής</div>
          <div>         
              {
                (bool? null : 
                <Alert className='text-center' variant='warning'><div style={{ fontSize: '160%' }}><b>Η έξοδος του ενισχυτή περιορίζεται από την τάση τροφοδοσίας!!!</b></div></Alert>) 
              }         
          </div>
          <div>
            <VccValueSelector x = {true} values={values} setValues={setValues} name='Vcc' measurement='V' options={[ 10, 12, 15, 20, 24, 30 ]}  />
            <div style={{ textAlign: 'center' }}> Διαφορά κορεσμού εξόδου από την τάση τροφοδοσίας (V) </div>
            <VccValueSelector values={values} setValues={setValues} name='field' options={[ 0, 0.5, 1, 2]} />
            <CircuitValueInput values={values} setValues={setValues} name='V1' measurement='V' measurements={measurementsV} min={0.001} max={10} />
            <CircuitValueInput values={values} setValues={setValues} name='V2' measurement='V' measurements={measurementsV} min={0.001} max={10} />
            <CircuitValueInput values={values} setValues={setValues} name='R1' measurement='Ω' measurements={measurementsR} min={100} max={1_000000} />
            <CircuitValueInput values={values} setValues={setValues} name='R2' measurement='Ω' measurements={measurementsR} min={100} max={1_000000} />
            <CircuitValueInput values={values} setValues={setValues} name='Rf' measurement='Ω' measurements={measurementsR} min={100} max={1_000000} />
          </div>
          <div>
            <div style={{ textAlign: 'center'}}>Υπολογισμοί</div>
            <CircuitValueInput values={outcomes} name='Vout' measurements={measurementsV} disabled fixed shouldBlink={!bool}/>
            <CircuitValueInput values={outcomes} name='Ac1' measurement='' disabled />
            <CircuitValueInput values={outcomes} name='Ac2' measurement='' disabled />
           
            <div style={{ textAlign: 'center' }}> Περιορισμένη τάση εξόδου </div>
            <CircuitValueInput values={outcomes} name="diff" measurements={measurementsV} measurement='V' disabled />
          </div>
        </Card.Body>
      </Card>
    )
}

Summing_Amplifier.image = circuitImg 