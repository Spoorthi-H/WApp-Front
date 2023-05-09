import React,{useState} from 'react'
import axios from 'axios';


function  App() {
  
 const[weather,setweather]= useState({})
   const[d,setd]=useState({name:""})
  
  const [temp,settemp] = useState('');
  const [desc,setdesc] = useState('');

  function sendname(e){
    const newname ={ ...d}
    newname[e.target.id] = e.target.value
    setd(newname);
    console.log(newname)
  }
  const submit = async(e)=>{
    
    e.preventDefault();
    
    console.log("inside submit");
    console.log(d.name)
    axios.post(`http://localhost:5000`,{name:d.name})
   .then((res)=>{
    console.log(res.data)
    setweather(res.data);
    
    const response=res.data;
    const t =res.data.main.temp
    settemp(t);
    const de = res.data.weather[0].description
    setdesc(de);
console.log(response)
 console.log("temp:"+res.data.main.temp)
 console.log(weather)
 console.log(desc);  
    })
    
    .catch((error)=>{
       console.log(error+"you are in error")})
    }
  
  

  return (
    <div className={(typeof temp != "undefined") ? ((temp > 16) ? 'app warm' : 'app') : 'app'}>
    <form action="" method="post" onSubmit={(e)=>submit(e)}>
    
      <main >
       <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            name="name"  required id="name"
            onChange={(e)=>sendname(e)}
            value={d.name}/>
           <button type="submit" className="buttongo">Go</button>          
           </div>

           {(typeof weather.main != "undefined")?
           (
        <div>
          <div className="location-box">
            <div className="location">{d.name}</div>
           
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(temp)}°c
            </div>
            <div className="weather">{desc}</div>
          </div>
        </div>
        ) : (' ')}
      </main>
      </form>
    </div>);
  }

  export default App;
  




   /* <div>
     <form action="" method="post"onSubmit={(e)=>submit(e)}>
     <div class="mb-3">
       <label class="form-label">City Name</label>
       <input type="text" class="form-control" name="name"  required id="name"value={d.name}  onChange={(e)=>sendname(e)}/>
   
      <button type="submit">Go</button>
      <h3>{d.name}</h3>
      <h4>{temp?temp +"degree celcius":(<div></div>)}</h4>
      <h5>{desc}</h5>
     </div>
    
     </form>
   
    </div>);*/
  
