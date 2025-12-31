interface Props {
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  cityInput: string;
}

export default async function APICalling({
  setLoading,
  cityInput,
  setError,

}: Props) {
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=c7ba5457bcc3ddc63a916f8976a04f51`;
  try {
    setLoading(true);
    setError(false);
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Faied to fetch the data");
    const data = await response.json();
    console.log(data)
    return data;
  } catch (e) {
    console.log(e)
    setError(true);
  } finally {
    setLoading(false);
  }
}
