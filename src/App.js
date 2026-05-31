import React  from "react";
import icons from "./icon/icons";

function App() {
 const [city ,setCity] = React.useState("tripoli")
const [weather,setWeather] = React.useState()
const [hourlyWeather , setHourlyWeather] = React.useState([])
const [moreInf, setMoreInf ]= React.useState(false)
   React.useEffect(() => {

    fetch(` https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=26315a940c9bf640195c2e4752a342cd`)
    .then(res => res.json())
    .then(data => setWeather(data))
    .catch(err => console.error(err));
   
   }, [city, moreInf] );

console.log(weather)





const hours = new Date().getHours() -12



function handelSearch(e){
e.preventDefault()
const formData= new FormData(e.target)
const inputValue = formData.get('input-search')
setCity(inputValue)
}
console.log(city)


function DirectionShow(){
if(!weather.list[0].wind){
  return 'loading'
}
const wind = weather.list[0].wind.deg

  if (wind < 45) {
    return 'North';
  }
  if (wind < 90) {
    return 'Northeast';
  }
  if (wind < 135) {
    return 'East';
  }
  if (wind < 180) {
    return 'Southeast';
  }
  if (wind < 225) {
    return 'South';
  }
  if (wind < 270) {
    return 'Southwest';
  }
  if (wind < 315) {
    return 'West';
  }
  if (wind < 360) {
    return 'Northwest';
  }
else{
  return wind;}
}

 if (weather){
  
  const m= weather.list[0].weather[0].main
  
  console.log(m)

}
let detail;
function imgShow(forecast) {
if (!weather.list[0].weather){
  return 'loading'

}

const main = forecast


  if(main==='Clear' ){
  return icons.clear
} 
else if(main==='Rain' ){
  return  icons.rain
} 
else if(main==='Snow' ){
  return  icons.snow}
else if(true ){
  return icons.cloud
} 
else if(main==='Thunderstorm' ){
  return icons.storm
}
 else if(main==='Mist' ){
  return icons.mist
} 
else {
  return icons.cloud
}
}



function toggoleInf(){
  setMoreInf(prev => !prev);
}

  return (
    <div className="App">
      <header className="header">
        <div className="up-page">
          <span>SAR WEATHER</span>
        </div>
        <div className="search-div"></div>
        <form onSubmit={handelSearch}>
          <input className="search" name="input-search" />
        </form>
      </header>

      {weather ? (
        <div className="body">
          <div className="card">
            <h1 className="name">City {weather.city?.name}</h1>
            <img src={imgShow(weather.list[0].weather[0].main)} className="icons" alt="icon" />
            <h2 className="temp">{weather.list[0]?.main && Math.round(weather.list[0].main.temp - 273.15)}</h2>
            <h3 className="feels-like">Feels Like {weather.list[0]?.main && Math.round(weather.list[0].main.feels_like - 273.15)}</h3>
            <h3 className="description">{weather.list[0]?.weather[0]?.description}</h3>


            {moreInf && (weather.list.map((any)=>(

<div className="more-detail">
    <img src={imgShow(any.weather[0].main)} className="icons" alt="icon" />
            <h2 className="temp">{Math.round(any?.main?.temp - 273.15)}</h2>
            <h3 className="feels-like"> {  Math.round(any.main.feels_like - 273.15)}</h3>
            <h3 className="description">{any?.weather[0]?.description}</h3>
            
<h3 className="humidity">Humidity {any?.main?.humidity}%</h3>
<h3 className="pressure">Pressure {any?.main?.pressure}</h3>
<h3 className="wind">Wind Speed {any?.wind?.speed}</h3>
<h3 className="Direction">Wind Direction {DirectionShow()}</h3>
</div>
            ))
)}
            
              

            <button onClick={toggoleInf} className="more-inf-button">
              {moreInf ? 'SEE less' : 'SEE more'}
            </button>
          </div>
        </div>
      ) : (
        <div className="load page">
          <p>.............</p>
        </div>
      )}
    </div>
  );
}

export default App;
