import React, { useState, useEffect } from "react";

const graphTypes = {
  d01: [
    { value: "avo_adv500", label: "500 hPa Absolute Vorticity Advection" },
    { value: "combined300", label: "Combined Map 300 hPa jet" },
    { value: "dbz", label: "Radar dBz" },
    { value: "hourly_precip", label: "Hourly Precipitation" },
    { value: "isent290", label: "290K Isentrophic Analysis" },
    { value: "isent320", label: "320K Isentrophic Analysis" },
    { value: "jet300", label: "300 hPa Jet Streams" },
    { value: "pwat", label: "Precipitable Water" },
    { value: "rh700", label: "700 hPa Relative Humidity" },
    { value: "rvo300", label: "300 hPa Relative Vorticity" },
    { value: "rvo500", label: "500 hPa Relative Vorticity" },
    { value: "sst", label: "Sea Surface Temperature" },
    { value: "t2_depression", label: "2m Temperature Depression" },
    { value: "t2m", label: "2m Temperature" },
    { value: "tempadv850", label: "850 hPa Temperature Advection" },
    { value: "temphgt500", label: "500 hPa Geopotential Height & Temperature" },
    { value: "temphgt850", label: "850 hPa Temperature" },
    { value: "thickness", label: "500 hPa Height & Thickness" },
    { value: "total_precip", label: "Total Precipitation" },
    { value: "tsk", label: "Skin Temperature" },
    { value: "vertical_v500", label: "500 hPa Vertical Velocity" },
    { value: "wind10", label: "10m Wind Speed" },
  ],
  d02: [
    { value: "dbz", label: "Radar dBz" },
    { value: "hourly_precip", label: "Hourly Precipitation" },
    { value: "pwat", label: "Precipitable Water" },
    { value: "rh700", label: "700 hPa Relative Humidity" },
    { value: "rvo300", label: "300 hPa Relative Vorticity" },
    { value: "rvo500", label: "500 hPa Relative Vorticity" },
    { value: "t2_depression", label: "2m Temperature Depression" },
    { value: "t2m", label: "2m Temperature" },
    { value: "tempadv850", label: "850 hPa Temperature Advection" },
    { value: "temphgt850", label: "850 hPa Temperature" },
    { value: "total_precip", label: "Total Precipitation" },
    { value: "tsk", label: "Skin Temperature" },
    { value: "vertical_v500", label: "500 hPa Vertical Velocity" },
    { value: "wind10", label: "10m Wind Speed" },
  ],
  gfs: [
    { value: "avo_adv500", label: "500 hPa Absolute Vorticity Advection" },
    { value: "combined300", label: "Combined Map 300 hPa jet" },
    { value: "jet300", label: "300 hPa Jet Streams" },
    { value: "pwat", label: "Precipitable Water" },
    { value: "rh700", label: "700 hPa Relative Humidity" },
    { value: "rvo300", label: "300 hPa Relative Vorticity" },
    { value: "rvo500", label: "500 hPa Relative Vorticity" },
    { value: "t2_depression", label: "2m Temperature Depression" },
    { value: "t2m", label: "2m Temperature" },
    { value: "tempadv850", label: "850 hPa Temperature Advection" },
    { value: "temphgt850", label: "850 hPa Temperature" },
    { value: "thickness", label: "500 hPa Height & Thickness" },
    { value: "vertical_v500", label: "500 hPa Vertical Velocity" },
    { value: "wind10", label: "10m Wind Speed" },
  ],
};

const checkImageExists = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("Error checking image existence:", error);
    return false;
  }
};

const generateImageLinks = async (baseFolder, domain, range) => {
  const folderPath = domain === "gfs" ? "gfs_output_maps" : "wrf_output_maps";
  const links = [];
  for (let i = 0; i <= range; i++) {
    links.push(`/images/${folderPath}/${domain}/${baseFolder}/${baseFolder}_${i}.jpg`);
  }
  return links;
};

const loadImagesWithFallback = async (graphType, domain, range) => {
  let imageLinks = await generateImageLinks(graphType, domain, range);
  const exists = await checkImageExists(imageLinks[0]);
  if (!exists) {
    imageLinks = await generateImageLinks("t2m", domain, range);
  }
  return imageLinks;
};

export default function Forecast() {
  const [activeGraph, setActiveGraph] = useState("t2m");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState("d01");
  const [range, setRange] = useState(24);
  const [imageLinks, setImageLinks] = useState([]);
  const [graphTypesState, setGraphTypes] = useState(graphTypes["d01"]);

  useEffect(() => {
    const fetchData = async () => {
      const links = await loadImagesWithFallback("t2m", "d01", 24);
      setImageLinks(links);
    };
    fetchData();
  }, []);

  const handleChangeGraph = async (graphType) => {
    setActiveGraph(graphType);
    const links = await loadImagesWithFallback(graphType, selectedDomain, range);
    setImageLinks(links);
    setSelectedImageIndex(0);
  };

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  const handleChangeDomain = async (domain) => {
    const newRange = domain === "d01" ? 24 : domain === "d02" ? 72 : 80;
    setSelectedDomain(domain);
    setRange(newRange);
    const links = await loadImagesWithFallback(activeGraph, domain, newRange);
    setImageLinks(links);
    setSelectedImageIndex(0);
    setGraphTypes([...graphTypes[domain]]); // Reset graph types with a new copy
  };

  return (
    <div className="forecast-page">
      <h1>Forecast</h1>
      <section className="forecast-section">
        <div className="forecast-options-panel">
          {graphTypesState.map((graph) => (
            <button key={graph.value} onClick={() => handleChangeGraph(graph.value)}>
              {graph.label}
            </button>
          ))}
        </div>
        <div className="forecast-image-container">
          <div className="forecast-image-holder">
            <img src={imageLinks[selectedImageIndex]} alt={`graph-${selectedImageIndex}`} />
          </div>
          <div className="forecast-slider-holder">
            <input
              type="range"
              min="0"
              max={imageLinks.length - 1}
              value={selectedImageIndex}
              onChange={(e) => handleImageChange(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="forecast-domain-panel">
          <button onClick={() => handleChangeDomain("gfs")}>GFS</button>
          <button onClick={() => handleChangeDomain("d01")}>WRF Domain 1</button>
          <button onClick={() => handleChangeDomain("d02")}>WRF Domain 2</button>
        </div>
      </section>
      <section className="forecast-about-container">
        <h2>About WRF Model</h2>
        <p>
        The Weather Research and Forecasting (WRF) model is a highly advanced mesoscale numerical weather prediction system designed to
        serve both atmospheric research and operational forecasting needs.
        It features multiple dynamical cores, a versatile data assimilation system, and a software architecture allowing
        for parallel computation and system extensibility.
        </p>
        <p>
        We are utilizing the WRF model in conjunction with the Global Forecast System (GFS) initial and boundary conditions (ICBC),
        updating our simulations with every 0Z GFS model run to ensure the highest accuracy and timeliness in our weather predictions.
        </p>
      </section>
    </div>
  );
}
