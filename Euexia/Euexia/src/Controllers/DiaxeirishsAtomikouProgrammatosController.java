/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import Model.AtomikoProgramma;
import Model.GenikoProgramma;

/**
 *
 * @author anastasia
 */
public class DiaxeirishsAtomikouProgrammatosController {

    AtomikoProgramma atomiko = new AtomikoProgramma();
    GenikoProgramma geniko = new GenikoProgramma();

    public void epilogiGenikouProgr() {
        geniko.epilogiGenikouProgr();
    }

    public void epilogiSynedrias(){
       geniko.epilogiSynedrias();
    }
    public void diagrafiSynedrias() {
        atomiko.diagrafiSynedrias();
       
    }
 
}
