// Η παρακάτω μέθοδος κάνει την επιλογή του κυκλώματος 
export default function ComponentFromArray (props) {
    // Κάθε φορά παίρνει το array και το index μέσω του props object (ή 0 ή 1 σε αυτή τη φάση) για να εμφανίσει το αντίστοιχο κύκλωμα
    const Comp = props.array[props.idx] 
    // Tο First καλείται μόνο για τη μετάβαση από το τελευταίο κύκλωμα των ΤΕ στο πρώτο των διπολικών τρανζίστορ
    const First = props.array[0]
    return (  
      // Αν στα κενά tag είχα div θα καταστρεφόταν στο styling (λειτουργεί σαν React.Fragment)
      <>  
        {
          // Ελέγχω αν το idx είναι μεγαλύτερο από το length του array (αν είναι π.χ. 3 θα πετάξει error)
          props.idx >= props.array.length  
            // ? : σύνταξη if-else -- αν είναι θα εμφανίσει το πρώτο κύκλωμα των διπολικών τρανζίστορ
            ? <First />    
            // Αλλιώς θα δείξει το component (το κύκλωμα που θέλουμε)
            // Θα πάρει από το line 18 το τρέχον component -- (trial and error)
            : <Comp />  
        }
      </>
    )
  }
