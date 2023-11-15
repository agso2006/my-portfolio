
package Model;

import java.sql.Time;
import java.util.Date;

public class SynedriaGymnastikis {
    private Date date;
    private Time time;

    public SynedriaGymnastikis() {
    }

    public SynedriaGymnastikis(Date date, Time time) {
        this.date = date;
        this.time = time;
    }

    public Date getDate() {
        return date;
    }

    public Time getTime() {
        return time;
    }

  
    
}
