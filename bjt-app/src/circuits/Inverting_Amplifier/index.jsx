import InvertingAmplifierr from './index2';
import CircuitImg from './circuit.png'

import React, {useState} from 'react';

export default function Inverting_Amplifier() {
  
  const [count, setCount] = useState(0);
  const [colorSin, setColorSin] = useState('blue')
  const [colorPulse, setColorPulse] = useState('black')


  return (
    <div>
      <p>Προβολή ως:
      
      <button className={colorSin} onClick={() => [setCount(0), setColorPulse(() => colorPulse == 'black'), setColorSin(() => colorSin === 'black' ? 'blue' : 'blue')]}>
        Ημίτονο </button>

      <button className={colorPulse} onClick={() => [setCount(1), setColorSin(() => colorSin == 'black'), setColorPulse(() => colorPulse === 'black' ? 'blue' : 'blue')]}>
        Παλμός </button>

      </p>
       
      <InvertingAmplifierr opt={count} > </InvertingAmplifierr> 

    </div>
      
  );
}
 
Inverting_Amplifier.image = CircuitImg
