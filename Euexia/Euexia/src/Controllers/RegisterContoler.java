
package Controllers;

import Model.Logariasmos;
import Model.Sindromitis;
import Model.Xristis;
import View.UIBegin;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author anastasia
 */
public class RegisterContoler {

    Logariasmos loga = new Logariasmos();
    Xristis xristisSyndromitis = new Sindromitis();
    static ResultSet rs = null;

    public int formRegister() {
        //dhmioygia logargiasmoy kai emfanish katallhlhs formas
        PreparedStatement insert = null;
        UIBegin log = new UIBegin();

        try {
            String driverClassName = "org.apache.derby.jdbc.ClientDriver";
            String url = "jdbc:derby://localhost:1527/avasilei ";
            String user = "AVASILEI";
            String pass = "Due3ohy3!";

            Connection dbConnection = DriverManager.getConnection(url, user, pass);
            Statement statementDbConnection = dbConnection.createStatement();
            String selectString = " Select username  From XRISTIS  ";

            rs = statementDbConnection.executeQuery(selectString);

            while (rs.next()) {
                String username = rs.getString("username");
                if (username.equals(loga.getUsername())) {
                    return -1;

                }
            }

            if (loga.getUsername().isEmpty() || loga.getPassword().isEmpty() || loga.getEmail().isEmpty()) {

                return -2;

            }

            Pattern pattern2 = Pattern.compile(".{6,}");
            Matcher mat2 = pattern2.matcher(loga.getPassword());
            if (mat2.matches() == false) {

                return -3;
            }

            Pattern pattern = Pattern.compile("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}");
            Matcher mat = pattern.matcher(loga.getEmail());
            if (mat.matches() == false) {

                return -4;

            }

            String insertQuery = "INSERT INTO Logargiasmos VALUES ('" + loga.getUsername() + "','" + "','"
                    + loga.getPassword() + "','" + loga.getEmail() + "','" + loga.getSyndromi() + "')";
            int exeUpdate = statementDbConnection.executeUpdate(insertQuery);
            return exeUpdate;

           // String insertQuery1 = "INSERT INTO XRISTIS VALUES ('" + xristisSyndromitis.getName() + "','" + xristisSyndromitis.getSurname() + "','"
            //        + xristisSyndromitis.getPhone() + "','" + xristisSyndromitis.getIdCard() + "')";

           // int exeUpdate1 = statementDbConnection.executeUpdate(insertQuery1);

          //  return exeUpdate1;
        } catch (SQLException ex) {
            Logger.getLogger(RegisterContoler.class.getName()).log(Level.SEVERE, null, ex);
        }

        return 1;

    }
}