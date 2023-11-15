package Model;

public class Logariasmos {

    private String username;
    private String password;
    private String email;
    private String syndromi;

    public Logariasmos() {
    }

    public Logariasmos(String username, String password, String email, String syndromi) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.syndromi = syndromi;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSyndromi() {
        return syndromi;
    }

    public void setSyndromi(String syndromi) {
        this.syndromi = syndromi;
    }

   

   

}
