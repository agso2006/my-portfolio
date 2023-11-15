import { Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function VccValueSelector(props) {
  const { x, values, setValues, name, measurement, options, disabled } = props

  if (measurement === undefined) return(   //αν δεν έρθει μεταβλητή measurement τότε εμφανίζεται το πεδίο
    <>
      <InputGroup className='mb-3'>
        <Form.Control
          as="select"
          value={values[name]}
          title={values[name]}
          onChange={event => setValues({ ...values, [name]: event.target.value })}
          disabled={disabled}
          
        >
          {options.map((voltage) => (
            <option key={voltage} value={voltage}>{voltage}</option>
          ))}
        </Form.Control>
      </InputGroup>
    </>
  )

  else 
    if (x && name==='Vcc') return (   //αν το x έχει έρθει απο τελεστικό ενισχυτή πρέπει όταν ο χρήστης κανει mouseover στο Vcc να εμφανίζεται μήνυμα
      <>
        <OverlayTrigger placement='left' 
          overlay={ <Tooltip> Η θετική τάση τροφοδοσίας Vcc είναι ίση με την αρνητική Vee </Tooltip> }> 
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text style={{width: '5rem', userSelect: 'none'}}>
                <span style={{ fontVariantCaps: 'small-caps' }}>{name}</span>
                <span style={{ marginLeft: 'auto' }}>{'(' + measurement + ')'}</span>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" value={values[name]} title={values[name]} onChange={event => setValues({ ...values, [name]: event.target.value })} disabled={disabled}>
              {options.map((voltage) => ( <option key={voltage} value={voltage}>{voltage}</option> ))}
            </Form.Control>
          </InputGroup>
        </OverlayTrigger>    
      </>
    )
    else return (   //αν ο χρήστης κανει mouseover αλλού δε θέλω μήνυμα
      <>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{width: '5rem', userSelect: 'none'}}>
              <span style={{ fontVariantCaps: 'small-caps' }}>{name}</span>
              <span style={{ marginLeft: 'auto' }}>{'(' + measurement + ')'}</span>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control as="select" value={values[name]} title={values[name]} onChange={event => setValues({ ...values, [name]: event.target.value })} disabled={disabled}>
            {options.map((voltage) => ( <option key={voltage} value={voltage}>{voltage}</option> ))}
          </Form.Control>
        </InputGroup>  
    </>  
    )
}
