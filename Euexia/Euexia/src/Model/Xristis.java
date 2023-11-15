package Model;

public abstract class Xristis {

    private String name;
    private String surname;
    private int phone;
    private String address;
    private String idCard;   //auxon arithmos opou S-->Syndromitis Y--> Ypallilos px 1Y

    public Xristis() {
    }

    public Xristis(String name, String surname, int phone, String address, String idCard) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.address = address;
        this.idCard = idCard;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

}
