package Model;

public class Ypallilos extends Xristis {

    private String staffCard;
    private int afm;
    private double salary;
    private double workingHours;

    public Ypallilos() {
        
    }

    public Ypallilos(String staffCard, int afm, double salary, double workingHours, String name, String surname, int phone, String address, String idCard) {
        super(name, surname, phone, address, idCard);
        this.staffCard = staffCard;
        this.afm = afm;
        this.salary = salary;
        this.workingHours = workingHours;
    }

    public String getStaffCard() {
        return staffCard;
    }

    public void setStaffCard(String staffCard) {
        this.staffCard = staffCard;
    }

    public int getAfm() {
        return afm;
    }

    public void setAfm(int afm) {
        this.afm = afm;
    }

    public double getSalary() {
        return salary;
    }

    public double getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(double workingHours) {
        this.workingHours = workingHours;
    }

  
}
