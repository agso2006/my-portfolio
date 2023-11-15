// Import το useState και useEffect hook-- μπορώ να χρησιμοποιήσω τα hooks μόνο μέσα σε ένα functional component
import React, { useState, useEffect } from 'react' 
// Import bootstrap (για Row και Col το βλέπω και με F12)-- το Container χρησιμοποιείται για να διαχειριστεί το περιεχόμενο της σελίδας (contain, pad, align)
import { Container, Row, Col } from 'react-bootstrap' 
// Import το component BJT
import Bjt from '../circuits/bjt'   
// Import το component VDB
import VDB from '../circuits/VDB'
// Import το component Emitter 
import Emitter from '../circuits/Emmiter'
// Import το component Inverting_Amplifier 
import Inverting_Amplifier from '../circuits/Inverting_Amplifier/index'
import Non_Inverting_Amplifier from '../circuits/Non-Inverting_Amplifier/index'
import Summing_Amplifier from '../circuits/Summing_Amplifier'
import Difference_Amplifier from '../circuits/Difference_Amplifier'
import ComponentFromArray from './componentfromarray'

export default function Main (props) {        

  const {opt} = props

  // Δήλωση ενός array με τα components
  var components  
  if (opt === 0) components = [VDB, Bjt, Emitter] 
  else components = [Inverting_Amplifier, Non_Inverting_Amplifier, Summing_Amplifier, Difference_Amplifier]

  // Επιστρέφεται ένα array με 2 objects
  // Το key είναι το current state μας σε κάθε στιγμή το οποίο θα αλλάζει με το render και το setKey η function που μας επιτρέπει να κάνουμε update το current state
  // Η default τιμή που ξεκινάει είναι το 0
  const [key, setKey] = useState(0) 
                                    
  // To $ μας δείχνει την τιμή που έχει εκείνη τη στιγμή το key. Γίνεται έλεγχος του index (μέσω του key) αν είναι πάνω απ' τα όρια του array 
  // Αν είναι το κάνει 0 αλλιώς το αφήνει όπως είναι 
  // Όταν θα έχω παραπάνω κυκλώματα θα μου χρησιμεύσει για να τα αλλάζω 
  useEffect(() => setKey($ => $ >= components.length ? 0 : $), [key, setKey]) 

  // Το image το δηλώνουμε στις index κάθε κυκλώματος... .image = circuitImg όπου κάνω import την εικόνα
  return (
    <Container className='App mb-4' style={{  backgroundColor: 'lightblue' }}>
      <div style={{  position: 'static', textAlign: 'center', fontSize: '22px' }}>Επιλέξτε κύκλωμα:</div> 
      <div className='d-flex mb-2' style={{ overflowX: 'scroll' }}>
        {components.map(($, idx) => ( // $ Συμβολίζει το current component
          <div style={{ display: 'inline-block', marginLeft: '1rem' }} key={$.image}>
            <img                      //Η map στην ουσία παίρνει ένα array και εμφανίζει ένα άλλο array
              style={{ 
                      maxHeight: '10rem', 
                      paddingTop: '1rem', 
                      borderStyle: 'outset', borderWidth: '7px', borderBottom: '5px solid grey', 
                      marginBottom: '15px', paddingBottom: '15px', 
                      borderBottomColor: 'black', borderLeftColor: 'black', borderRightColor: 'black', borderTopColor: 'black', 
                      borderColor: ((idx === key) ? 'blue' : 'black') // Όταν επιλέγεται ένα κύκλωμα γίνεται μπλε το border του  
                    }}
              src={$.image}           // Η τρέχουσα εικόνα -- Αν πάω το ποντίκι επάνω στο $.image λέει typeof--> το component που είναι πρώτο στο array με τα components (στα components έχω δηλωμένο VDB.image, Emmiter.image κ.τ.λ.--αυτά είναι το $)
              alt=''                  // Αν δεν βρει εικόνα τι θα εμφανίσει (στην ουσία πάντα κενό)
              onClick={() => setKey(idx)} // Όταν γίνει κλικ καλείται η setKey με το αντίστοιχο idx (πάντα κλειδώνει ανάλογα ποιο είναι)
            />
          </div>
        ))}
      </div>
      <Row>
        <Col xs={12}>
          <ComponentFromArray array={components} idx={key} />
        </Col>
      </Row>
    </Container>
  )
}
// line 58 τα array και idx περνάνε παραμετρικά στο props--> line 14 App (parent, child ComponentfromArray) *θα μπορούσε η παραπάνω μέθοδος να είναι σε άλλο αρχείο