
package Model;

public class EidosGymnastikhs {

    private String name;
    private String type;
    private int id=0;
//kwdikos EidosGymnastikhs

    public EidosGymnastikhs() {

    }

    public EidosGymnastikhs(String name, String type) {
        this.name = name;
        this.type = type;
        id = id();
    }

    public String getName() {
        return name;
    }

    

    public String getType() {
        return type;
    }


    public int getId() {
        return id;
    }

    private int id(){
        id=+1;
        return id;
        
    }
  
    
    

}
