package Model;

public class Sindromitis extends Xristis {

    private int memberCard=0;

    public Sindromitis() {
    }

    public Sindromitis(String name, String surname, int phone, String address, String idCard) {
        super(name, surname, phone, address, idCard);
        memberCard = getMemberCard();
    }

    public int getMemberCard() {
        if(memberCard==0){
            memberCard = 000001;
        }else
            memberCard=memberCard+1;
        return memberCard;
        
    }

   

    @Override
    public String toString() {
        return "Sindromitis{" + "memberCard=" + memberCard + '}';
    }

}
