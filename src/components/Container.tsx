import Input from "./UI/Input";
import SearchBtn from "./UI/Search-button";
import WeatherCard from "./UI/WeatherCard";
import APICalling from "../Utils/APICalling";
import { createContext, useEffect, useState } from "react";
import "../styles/container.css";
import "../styles/weathercard.css";
import "../styles/inputAndSearch.css";

interface WeatherDataTypes {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
  wind: { speed: number };
}

export const WeatherData = createContext<WeatherDataTypes | null>(null);
export let gradientContext = createContext<string | null>(null);

function Weather_tab() {
  const [data, setData] = useState<WeatherDataTypes | null>(null);
  const [cityInput, setCityInput] = useState<string>("London");
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<boolean>(false);
  let [gradient, setGradient] = useState<string>(
    "linear-gradient(to top, #B0E0E6, #F0F8FF)"
  );
  useEffect(() => {
    const fetching = async () => {
      const apidata = await APICalling({ setLoading, setError, cityInput });
      setData(apidata);
    };
    fetching();
  }, [cityInput]);

  useEffect(() => {
    if (data && data.weather[0].description) {
      const weather = data.weather[0].description;
      getGradientByWeather(weather);
      setTimeout(() => {
        document.body.style.background = gradient;
      }, 100);

      const newClass = weather.replace(/ /g, "-");
      // const newClass = 'broken-clouds'
      if (document.body.className) {
        const currentClass = document.body.className;
        document.body.classList.replace(currentClass, newClass);
      } else {
        document.body.classList.add(newClass);
      }
    }
  }, [data]);

  const getGradientByWeather = (weather: string) => {
    switch (weather) {
      case "clear sky":
        setGradient("linear-gradient(to top, #87CEEB, #FFFFFF)");  
        break;
      case "few clouds":
        setGradient("linear-gradient(to top, #B0E0E6, #F0F8FF)");  
        break;
      case "scattered clouds":
        setGradient("linear-gradient(to top, #A9A9A9, #D3D3D3)");  
        break;
      case "broken clouds":
        setGradient("linear-gradient(to top, #808080, #B0C4DE)");  
        break;
      case "rain":
        setGradient("linear-gradient(to top, #4682B4, #5F9EA0)");  
        break;
      case "shower rain":
        setGradient("linear-gradient(to top, #5F9EA0, #B0C4DE)");  
        break;
      case "thunderstorm":
        setGradient("linear-gradient(to top, #2F4F4F, #000000)");  
        break;
      case "snow":
        setGradient("linear-gradient(to top, #FFFFFF, #F0F8FF)");  
        break;
      case "mist":
      case "fog":
        setGradient("linear-gradient(to top, #D3D3D3, #A9A9A9)");  
        break;
    }
  };

  return (
    <>
      <div className="container">
        <WeatherData.Provider value={data}>
          <gradientContext.Provider value={gradient}></gradientContext.Provider>
          <div className="inputandsearch">
            <Input />
            <SearchBtn setCityInput={setCityInput} />
          </div>
          <WeatherCard {...{ loading, error }} />
        </WeatherData.Provider>
      </div>
    </>
  );
}

export default Weather_tab;
