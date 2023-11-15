package Controllers;

import Model.Logariasmos;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class LoginController {

    Logariasmos log;



    public void findAccount(String username) {
 
        try {
            String driverClassName = "org.apache.derby.jdbc.ClientDriver";
            String url = "jdbc:derby://localhost:1527/avasilei ";
            String user = "AVASILEI";
            String pass = "Due3ohy3!";

            Connection dbConnection = DriverManager.getConnection(url, user, pass);
            Statement statementDbConnection = dbConnection.createStatement();
            String selectString = " Select username  From XRISTIS  ";
            ResultSet rs = statementDbConnection.executeQuery(selectString);
            while (rs.next()) {
                String userL = rs.getString("username");
             

                if (userL.equals(username) ) {

                    System.out.println("Ο λογαργιασμος υπάρχει");
                    
                }
            }
        } catch (SQLException ex) {

            System.out.println("Παρακαλώ πολύ δοκιμάστε άλλο username ");
        }
 
    }

    public String forgotPassword() {
        return "xexases to password dokimase prohgoymeno";
    }

    public static void login(String username, String password) {

        try {
            String driverClassName = "org.apache.derby.jdbc.ClientDriver";
            String url = "jdbc:derby://localhost:1527/avasilei ";
            String user = "AVASILEI";
            String pass = "Due3ohy3!";

            Connection dbConnection = DriverManager.getConnection(url, user, pass);
            Statement statementDbConnection = dbConnection.createStatement();
            String selectString = " Select username,password  From XRISTIS  ";
            ResultSet rs = statementDbConnection.executeQuery(selectString);
            while (rs.next()) {
                String userL = rs.getString("username");
                String passL = rs.getString("password");

                if (userL.equals(username) && passL.equals(password)) {

                    System.out.println("Συνδεθηκατέ");

                }
            }
        } catch (SQLException ex) {

            System.out.println("Παρακαλώ πολύ δοκιμάστε να αλλάξετε όνομα ή password ");
        }

    }

}
