import React, { useState } from 'react'
import Main from "./main/main"

function App() {
    const [count, setCount] = useState(0);
    const [showMain, setShowMain] = React.useState(false)

    const [colorBJT, setColorBJT] = useState('black')
    const [colorOP, setColorOP] = useState('black')
    
    return (
      <div>
        <h3 style = {{ textAlign: "center", fontWeight: "bold"}}>Διαδικτυακή εφαρμογή ανάλυσης λειτουργίας βασικών ηλεκτρονικών κυκλωμάτων και διατάξεων</h3>
        <h5 style = {{ textAlign: "center", marginTop: "10px"}}>Επιλέξτε κατηγορία:
        <br></br> 

        <button className={colorBJT} onClick={() => [setCount(0), setShowMain(true), setColorOP(() => colorOP == 'black'), setColorBJT(() => colorBJT === 'black' ? 'blue' : 'blue')]}>
          Διπολικά τρανζίστορ </button>
        
        <button className={colorOP} onClick={() => [setCount(1), setShowMain(true), setColorBJT(() => colorBJT == 'black'), setColorOP(() => colorOP === 'black' ? 'blue' : 'blue')]}>
          Τελεστικοί ενισχυτές </button>
  
        </h5>

        {showMain? <Main opt={count}    /> : null }
        
        <footer>
          <p style = {{ textAlign: "center", fontSize: "20px" }}><u>Ανάπτυξη εφαρμογής:</u> Χαραλαμπίδης Άγγελος [<a href = "mailto: agso2006@gmail.com">agso2006@gmail.com</a>] </p>
          <p style = {{ textAlign: "center", fontSize: "20px", marginLeft: "257px" }}><u>Επιβλέπων καθηγητής:</u> Παπακώστας Δημήτριος [<a href = "https://www.iee.ihu.gr/staff/papakostas-dimitrios/">https://www.iee.ihu.gr/staff/papakostas-dimitrios/</a>]</p>
          <p style = {{ textAlign: "center", fontSize: "20px", marginLeft: "-47px" }}><u>Βίντεο παρουσίασης λειτουργιών:</u> [<a href = "https://youtu.be/nlYoucDkBAs">https://youtu.be/nlYoucDkBAs</a>] </p>
        </footer>
      </div>
        
    )
}

export default App 