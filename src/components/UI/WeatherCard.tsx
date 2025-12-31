import { useContext } from "react";
import { WeatherData } from "../Container";

interface Props {
loading: Boolean;
  error: Boolean;
}

export default function WeatherCard({ loading, error }: Props) {
  const data = useContext(WeatherData);

  if (loading) {
    return <div style={{margin:"1rem"}}>Loading...</div>;
  }

  if (error) {
    return <div style={{margin:"1rem"}}>Something went wrong, please try again.</div>;
  }

  return (
    <div className="weather-card">
      <table className="weather-table">
        <tbody>
          <tr>
            <td>City:</td>
            <td>{data?.name}</td>
          </tr>
          <tr>
            <td>Temperature:</td>
            <td>{(Number(data?.main.temp) - 273).toFixed(2)}°C</td>
          </tr>
          <tr>
            <td>Weather:</td>
            <td>{data?.weather[0].description}</td>
          </tr>
          <tr>
            <td>Humidity:</td>
            <td>{data?.main.humidity}%</td>
          </tr>
          <tr>
            <td>Wind-Speed:</td>
            <td>{data?.wind.speed} m/s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
