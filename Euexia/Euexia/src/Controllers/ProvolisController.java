
package Controllers;

import Model.AtomikoProgramma;
import Model.GenikoProgramma;

/**
 *
 * @author anastasia
 */
public class ProvolisController {

    AtomikoProgramma atomiko = new AtomikoProgramma();
    GenikoProgramma geniko = new GenikoProgramma();

    public void epiloghAtomikoyProgrmmatos() {
        atomiko.epiloghAtomikoyProgrmmatos();
    }

    public void epilogiGenikouProgr() {
        geniko.epilogiGenikouProgr();
    }
}
