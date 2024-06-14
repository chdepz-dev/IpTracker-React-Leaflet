import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import config from "./config/config";


function App() {
  const [ip, setIp] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
// console.log(ip)
  const initialData = async () => {
    const response = await fetch("https://api.ipregistry.co", {
      method: "GET",
      headers: {
        Authorization: `ApiKey ${config.ip_registry_key}`,
      },
    });
    const data = await response.json();
    setIp(data);
  };

  useEffect(() => {
    try {
      initialData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ipAddress) {
      try {
        const searchData = async () => {
          const response = await fetch(
            `https://api.ipregistry.co/${ipAddress}`,
            {
              method: "GET",
              headers: {
                Authorization: `ApiKey ${config.ip_registry_key}`,
              },
            }
          );
          const data = await response.json();
          if (data.ip) {
            setIp(data);
          }
        };
        searchData();
      } catch (error) {
        console.log(error);
      }
    } else if (ipAddress === "empty") {
      initialData();
    } else {
      alert("Invalid ip address");
    }
  };
  return (
    <>
      <section>
        <header>
          <h1>IP TRACKER</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="search any ip address"
              value={ipAddress}
              onChange={ (e) => setIpAddress(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          {ip && (
            <div className="info-container">
              <div className="ip">
                <h3>IP ADDRESS</h3>
                <h5>{ip.ip}</h5>
              </div>
              <div className="location">
                <h3>LOCATION</h3>
                <h5>{ip.location.country.name}, {ip.location.city} {ip.postal}</h5>
              </div>
              <div className="timezone">
                <h3>TIMEZONE</h3>
                <h5>{ip.time_zone.id}</h5>
              </div>
              <div className="isp">
                <h3>ISP</h3>
                <h5>{ip.connection.domain}, {ip.connection.organization}</h5>
              </div>

              <div className="browser">
                <h3>User Agent</h3>
                <h5>{ip.user_agent.name} {ip.user_agent.type}</h5>
              </div>
            </div>
          )}
        </header>
        <Map data={ip} />
      </section>
    </>
  );
}

export default App;
