import "./App.css";
import AppleLottery from 'react-lottery';
import 'react-lottery/dist/index.css';
import Gold from './gold.png'
import ChestBox from './chest_box.png'
import CaveMan from './caveMan.png'
import Energy from './energy.png'
function App() {
  const list = [
    {id:0,name: '10K Gold', img: Gold, chance:1},
    {id:1,name: '1x Warrior', img: CaveMan,chance:1},
    {id:2,name: '3x Gold', img: Gold,chance:1},
    {id:4,name: '2x Wizerd', img: CaveMan,chance:1},
    {id:5,name: '100% Energy', img: Energy,chance:1},
    {id:8,name: '100K Box', img:ChestBox,chance:1},
    {id:7,name: '1x Dragon', img: CaveMan,chance:1},
    {id:21,name: '2K Gold', img: Gold,chance:1},
  ];
  
  let lotteryTimes = 5;
   
  const arrayShuffle = (array) => {
    for ( var i = 0, length = array.length, swap = 0, temp = ''; i < length; i++ ) {
       swap        = Math.floor(Math.random() * (i + 1));
       temp        = array[swap];
       array[swap] = array[i];
       array[i]    = temp;
    }
    return array;
 };

 
const percentageChance = (values, chances) => {
  for ( var i = 0, pool = []; i < chances.length; i++ ) {
     for ( var i2 = 0; i2 < chances[i]; i2++ ) {
        pool.push(i);
     }
  }
  return values[arrayShuffle(pool)['0']];
};

const getIndexofSelected = () => {
  const idArray = list.map(value => {
    return value.id
  })
  const chanceArray = list.map(value => {
    return value.chance
  })
  const id = percentageChance(idArray, chanceArray);

  const wonIndex = list.findIndex(x => x.id === id);
 
  return wonIndex;
}


  return (
    <div className="App">
      <header className="App-header">
      <AppleLottery
      list={list}
      rowCount={3}
      style={{
        width: document.body.clientWidth < 600 ? '90vw' : '600px',
        height: document.body.clientWidth < 600 ? '90vw' : '600px',
        
      }}
      initialSpeed={150}
      itemStyle={(item, index, isActive) => {
        return {
          background: item.color,
          display:'flex',
        justifyContent:'center',
        alignItems:'center',
        border:'1px solid white'
        };
      }}
      itemImageStyle={{
        width:150
      }}

      validate={(next) => {
        if (lotteryTimes <= 0) {
          alert('No more lottery times! Now give you 5 times.');
          lotteryTimes = 5;
        } else {
          lotteryTimes -= 1;
          setTimeout(() => next(true), 50);
        }
      }}
      onLotteryStart={(complete, state) => {
        const number = getIndexofSelected();
          console.log('nnnn', number)
        setTimeout(() => {
         
          complete(number)
        }, 4000);
      }}
      onLotteryComplete={(index, item) => {
        alert('You have won ', item.name)
      }}
    />
       
      </header>
    </div>
  );
}

export default App;
