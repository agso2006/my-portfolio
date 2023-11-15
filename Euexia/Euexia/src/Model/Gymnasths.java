
package Model;

public class Gymnasths extends Ypallilos{
    private String speciality;

    public Gymnasths() {
    }

    public Gymnasths(String speciality, String staffCard, int afm, double salary, double workingHours, String name, String surname, int phone, String address, String idCard) {
        super(staffCard, afm, salary, workingHours, name, surname, phone, address, idCard);
        this.speciality = speciality;
    }

    public String getSpeciality() {
        return speciality;
    }

    @Override
    public String toString() {
        return "Gymnasths{" + "speciality=" + speciality + '}';
    }
    
    
}
