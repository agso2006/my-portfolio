import { useEffect, useState } from 'react'
// To InputGroup  είναι bootstrap που μας δείχνει π.χ και το V μαζί με την τιμή
// Το FormControl κάνει directly render το input
import { FormControl, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'  
// line 7-line 131 - συνδέει το circuit-value-input.jsx με το app.js (λόγω του export)
export default function CircuitValueInput (props) {   
  /* eslint-disable-next-line no-unused-vars */
  // measurements είναι για να μπορούν να λειτουργούν και οι αλλαγές με τις μονάδες μέτρησης και όταν δεν αλλάζει η μονάδα 
  const { name, values, setValues, fixed, measurement, measurements, min, max, skipValidations } = {
    // default τιμές
    setValues: () => {},
    min: -Infinity,               
    max: Infinity,                
    measurements: [{
      symbol: props.measurement,
      restore: v => v,
      render: v => v
    }],
    skipValidations: props.disabled, // Αν είναι disabled (readonly) να μην κάνει validations
    ...props                      
  }
// line 9 είναι σαν να λέω const name = props.name και τα υπόλοιπα etc...
// Επειδή δεν υπάρχει το setValues στο Index.jsx line 121-127 όπως Line 114-118 του λέω αν δεν υπάρχει, φέρ' το (line 17) και φέρε και όλα τα props (line 26)
// Αυτό το κάνω για να μην ξαναγράφω για κάθε κύκλωμα το CircuitValueInput (lines 114-118)

const [inputValue, setInputValue] = useState(values[name])
const [inputIsValid, setInputIsValid] = useState(true)

// Το measurements είναι array, όταν κάνω κλικ πάνω π.χ. στο ib και αλλάζει η μονάδα πηγαίνει κυκλικά (Ω, kΩ...) αν π.χ. είναι 2 το μηδενίζει για να πάει στο 1ο πάλι
// άρα εδω όταν currentmeasurement γίνει 2 το μηδενίζει (δεν μπορεί να πάει πάνω από 2, 2 μονάδες μέτρησης έχουμε Ω kΩ)
const [currentMeasurement, setCurrentMeasurement] = useState(0)
useEffect(
  () => setCurrentMeasurement(currentMeasurement >= measurements.length ? 0 : currentMeasurement),
  [currentMeasurement, setCurrentMeasurement]
)

// Καλεί την αντίστοιχη restore
// Χρησιμοποιώ την toString γιατί η match λειτουργεί με strings
const restore = value => measurements[currentMeasurement]
    ? measurements[currentMeasurement].restore(               // καλεί τη restore από τη μονάδα μέτρησης που έχουμε εκείνη τη στιγμή (currentmeasurement)
        parseFloat(
          value.toString().match(/(^\d+(\.\d+)?)?/)[0] || 0   // Παίρνει μόνο το νούμερο κι όχι μονάδα μέτρησης
        )                                                     // εμφανίζει από το 25Ohm π.χ. το 25
      )                                                       // αν δεν βρει νούμερο με υποδιαστολή επιστρέφει 0
    : 0

const validations = [
  // Check for invalid characters
  // Ελέγχει αν είναι valid
  value => !/^\.(\d)/.test(value),  // τα 3 πρώτα είναι άχρηστα
  value => !/\.{2,}/.test(value),
  value => !/\.([^\d])/.test(value),
  value => /^\d+(\.\d+)?$/.test(value),     // νούμερο.νούμερο
                                            // ^ ξεκινάει στρινγκ $ τελειώνει αν υπάρχει 1+ ψηφία ? σημαίνει προαιρετική παρένθεση
                                            // μπορεί δηλαδή να υπάρχει 1 ή 1,1

  // Limit to min value                   
  value => restore(value) >= min,        // Όρια καλώντας την αντίστοιχη restore από το Index τα όρια που δώσαμε στο index π.χ 116 line

  // Limit to max value
  value => restore(value) <= max

]

// Χρήσιμο για debugging
  /* eslint-disable-next-line no-unused-vars */
  const [inputValidationResults, setInputValidationResults] = useState([])  // Αποθηκεύει τα αποτελέσματα από τα παραπάνω validations

// Έλεγχοι αν τα input μπορούν να χρησιμοποιηθούν στους υπολογισμούς
// το useEffect παρακολουθεί τι υπάρχει μέσα στο input για να το βάλει στο values
useEffect(() => {
  if (props.disabled) return  // αν είναι read only δεν κάνει κανένα έλεγχο

  // Υπολογισμός των validation
  const results = validations.map(validation => validation(inputValue)) //αποθηκεύει τα αποτελέσματα από όλα τα value των validations

  // Αποθήκευση του πίνακα με τις εξόδους validation (χρησιμεύει μόνο στο debugging όχι κάπου λειτουργικά)
  setInputValidationResults(results)

  // Έλεγχος αν κάποιο validation απέτυχε
  const isValid = skipValidations || !results.some(result => !result) // ή skipValidations ή αν βρει κάποιο validation false τότε η some επιστρέφει true

  // Αποθήκευση αποτελεσμάτων
  setInputIsValid(isValid)        
  // αν όλα είναι valid τα αποθηκεύει στο κύκλωμα (setValue line 26 Και 114 π.χ.)
  // [name] σημαίνει ότι θα πειράξει αυτό που υπάρχει μέσα στη μεταβλητή και όχι τη μεταβλητή
  // Δημιουργώ ένα field πάνω στο name που έχει ως όνομα την τιμή του name -- γίνεται override το συγκεκριμένο, γι αυτό φέρνω τα ...values
  isValid && setValues({ ...values, [name]: restore(inputValue) })  // Ανανεώνει το value μόνο όταν είναι valid αυτά που δίνει ο χρήστης
}, [inputValue, setInputValidationResults, setInputIsValid, setValues])

// Υπολογίζει την τιμή που θα εμφανίζεται βάσει του measurements, αν υπάρχει το τρέχον measurement
// το useEffect παρακολουθεί τι υπάρχει μέσα στο values για να το βάλει στο input
// αν υπάρχει το currentMeasurement κάλεσε τη setInputValue
useEffect(() => measurements[currentMeasurement] && setInputValue(
  // Καλεί την αντίστοιχη render από το index
  // αν είναι fixed να εμφανίζονται τα 3 πρώτα δεκαδικά αλλιώς εμφανίζεται όπως είναι 
  // values[name] επιστρέφει την τιμή που έχει αυτή τη στιγμή το input
  measurements[currentMeasurement].render(
    fixed
      ? Number.parseFloat(values[name]).toFixed(3)    
      : values[name]
  )
), [values, currentMeasurement, setInputValue])

const getLabel = () => {
  // Αν περνάω label (bjtMode) άρα ή label ή name
  var label
  if (name === 'bjtMode') label = props.label
  else if (name === 'diff') label = ''
  else label = name
  const labelElem = <span style={{ fontVariantCaps: props.allowLower ? 'normal' : 'small-caps' }}>{label}</span>  // Αρχικό label (αριστερά με τη μονάδα μέτρησης)

  // Αν υπάρχει το currentMeasurement και έχει symbol, να εμφανίσει το symbol στο label
  if (measurements[currentMeasurement] && measurements[currentMeasurement].symbol.length) {
    return (
      // εμφανίζει το (Ω) π.χ.
      // labelElem για β και περιοχή, label για τα υπόλοιπα
      <>
        {labelElem} 
        <span style={{ marginLeft: 'auto' }}>({measurements[currentMeasurement].symbol})</span>
      </>
    )
  } else {
    // Αν δεν υπάρχει το παραπάνω if περνάω μόνο το label
    return <>{labelElem}</> 
  }
}

const circuitValueGroup =  (
  <InputGroup className={'mb-3 ' + (props.shouldBlink ? 'blink' : '')}>
    <InputGroup.Prepend>
      <InputGroup.Text
        style={{
          width: props.label ? undefined : '5rem', // Αν έχει label (bjtMode) να μην οριστεί width
          userSelect: 'none', // να μην μπορώ να το μαρκάρω
          // To array measurements έχει μέσα τις μονάδες μέτρησης, ουσιαστικά είναι πάντα πάνω από 1, του λέω όταν έχει πάνω από μια να αλλάζει χρώμα
          backgroundColor: measurements.length > 1 ? 'var(--bs-primary)' : undefined
        }}
        //αν κάνω κλικ στη μονάδα μέτρησης το κάνει +1 (αλλάζει η μονάδα)
        onClick={() => setCurrentMeasurement(currentMeasurement + 1)}
      >
        {getLabel()}
      </InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      value={inputValue}
      onChange={event => setInputValue(event.target.value)} // Παράμετρος event και καλεί το setInputValue line 23
      disabled={props.disabled}
      isInvalid={!inputIsValid} // Όταν γίνεται true κοκκινίζει το field
    />
    {inputIsValid || (
      <FormControl.Feedback type='invalid' tooltip>
        Μη έγκυρη τιμή
        <ul style={{ padding: 0 }}>
          {!!props.min && <li>Ελάχιστο: {props.min} {measurement}</li>}
          {!!props.max && <li>Μέγιστο: {props.max} {measurement}</li>}
        </ul>
      </FormControl.Feedback>
    )}
  </InputGroup>
)

return (
  measurements.length > 1
    ? (
      <OverlayTrigger
        placement='left'
        overlay={
          <Tooltip>
            Κάνε κλικ για αλλαγή μονάδας μέτρησης.
            Διαθέσιμες μονάδες:
            <ul style={{ padding: 0 }}>
              {measurements.map(m => (<li key={m.symbol}>{m.symbol}</li>))}
            </ul>
          </Tooltip>
        }
      >
        {circuitValueGroup}
      </OverlayTrigger>
      )
    : circuitValueGroup
)
}

// fontVariantCaps: props.allowLower για να είναι πιο ευανάγνωστα τα μικρά π.χ. Vc κ.τ.λ. normal κανονικά small caps μικρά κεφαλαία
// Θα μπορούσα το allowLower το fixed Και το disabled να τα βάλω μαζί με το name values και setValues line 9 για να μην τα γράφω κάθε φορά   
// line 88 επιτρέπει στον αριθμό να έχει μέχρι 3 δεκαδικά ψηφία, αν δεν έχει, δεν επιτρέπει τα υπόλοιπα, αλλιώς τον εμφανίζει όπως έιναι (values[name])                          
// line 129 κάνει τα textfield να είναι read-only
