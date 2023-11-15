// Χρήση της βιβλιοθήκης recharts
import {LineChart, ReferenceLine, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid} from 'recharts';
import {Row} from 'react-bootstrap'
import './styles.scss'

export default function Pulse(props) {
const {sr, frequency, voltages} = props
const TIME_SCALE = 1000 //αφού ο χρόνος είναι σε s και εγώ θέλω μs
const T = 1/frequency
const t = TIME_SCALE*T  //αφού ο χρόνος είναι σε s και εγώ θέλω μs

const plotData = 
[{time: 0, in: voltages[0], out: 0},
{time: Math.abs(voltages[1]/sr), in: voltages[0], out: voltages[1]},
{time: t/4, in: voltages[0], out: voltages[1]},
{time: t/2, in: voltages[0], in: voltages[0], in2: 0, out: voltages[1]},
{time: (t/2) + Math.abs(voltages[1]/sr), in2: 0, out: 0},
{time: 3*t/4, in2: 0, out: 0},
{time: t, in2: 0, out: 0}];

  return (
      <>

      {/* Φτιάχνω δικό μου legend γιατί του γραφήματος θα περιλαμβανει την κάθε" γραμμή (Line) ξεχωριστά */}
      <Row> <div> <div class='box blue'></div>Είσοδος </div>  <div> <div class='box red'></div>Έξοδος </div> </Row>

          <ResponsiveContainer width="310%" aspect={2}>
              <LineChart data={plotData} margin={{ right: 300 }}>
              
              {/* Φτιάχνω δικό μου grid για τις κάθετες γραμμές γιατί δεν το θέλω σε όλα τα σημεία */}
              <CartesianGrid vertical={false} stroke='grey' strokeDasharray="1 1" />
                  
                  <XAxis dataKey="time" allowDuplicatedCategory={false} tickLine={false} type='category' tickFormatter={n => {if (n === t/4 || n === 3*t/4) return ''; else return n.toString() + 'μs'}} />
                  <YAxis tickLine={false} tickFormatter={n => {return n.toString() + 'V'}}/>

                  {/* Ο παλμός εξόδου */}
                  <Line isAnimationActive={false} strokeWidth={4} dataKey="out" stroke="#d70202" dot={false} />

                  {/* Επειδή αν τα σημεία ενώνονται με μία γραμμή δε θα ενωθούν κάθετα φτιάχνω δύο κάθετες και δύο οριζόντιες εναλλάξ */}
                  <ReferenceLine isAnimationActive={false} strokeWidth={3} stroke="#4fc2f0" dot={false} segment={[{ x: 0, y: 0 }, { x: 0, y: voltages[0] }]} />
                  <Line isAnimationActive={false} strokeWidth={3} dataKey="in" stroke="#4fc2f0" dot={false} />
                  <ReferenceLine isAnimationActive={false} strokeWidth={3} stroke="#4fc2f0" alwaysShow={true} dot={false} segment={[{ x: t/2, y: voltages[0] }, { x: t/2, y: 0 }]} />
                  <Line isAnimationActive={false} strokeWidth={3} dataKey="in2" stroke="#4fc2f0" dot={false} />

                  {/* Φτιάχνω δικό μου grid για τις κάθετες γραμμές γιατί δεν το θέλω σε όλα τα σημεία */}
                  <ReferenceLine stroke="grey" strokeDasharray="1 1" dot={false} x={plotData[1].time} />
                  <ReferenceLine stroke="grey" strokeDasharray="1 1" dot={false} x={plotData[3].time} />
                  <ReferenceLine stroke="grey" strokeDasharray="1 1" dot={false} x={plotData[4].time} />
                  <ReferenceLine stroke="grey" strokeDasharray="1 1" dot={false} x={plotData[6].time} />
              </LineChart>
          </ResponsiveContainer>          
      </>
  );
}
