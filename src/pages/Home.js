import React, { useState, useEffect } from "react";
import bg_image from "./bg_image.jpg";
import itu_logo from "./itu_logo.png";
import "./pages.css";

const QUALIFICATIONS = [
  {
    icon: "groups",
    title: "Team Work",
    text: "If you're all about that teamwork vibe and love diving into a collective pool of knowledge",
  },
  {
    icon: "computer",
    title: "Computer Skills",
    text: "If you're a wizard with programming languages like Python, Fortran, or cool with software like R, or even keen to learn",
  },
  {
    icon: "analytics",
    title: "Analytical Thinking",
    text: "If you're all about seeing things from different angles and trust your analysis skills",
  },
  {
    icon: "search",
    title: "Spirit of Inquiry",
    text: "If you're curious and get excited about every new piece of knowledge you acquire",
  },
  {
    icon: "air",
    title: "Meteorology Knowledge",
    text: "If you're studying meteorological engineering and love analyzing current atmospheric events",
  },
  {
    icon: "tornado",
    title: "Atmospheric Model Knowledge",
    text: "If you're curious about the working principles of numerical weather prediction models",
  },
];

function LinkCard({ title, text, icon = "routine" }) {
  return (
    <div className="link-card">
      <span className="material-symbols-outlined">{icon}</span>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <span>VIEW PAGE</span>
    </div>
  );
}

function Panel({ imageUrl, altText, labelText, linkUrl }) {
  return (
    <div className="panel">
      <a href={linkUrl}>
        <img className="panel-image" src={imageUrl} alt={altText} />
      </a>
      <p className="panel-text">{labelText}</p>
    </div>
  );
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [imageUrls, setImageUrls] = useState({ temp2m: "", precip: "", wind10m: "" });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("en-GB", { timeZone: "Europe/Istanbul" }).replace(/\//g, "-"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const generateImageFilenames = () => {
      const todayInitTime = new Date();
      todayInitTime.setUTCHours(0, 0, 0, 0);

      const filenames = [];
      for (let i = 0; i < 25; i++) {
        const time = new Date(todayInitTime.getTime() + i * 3 * 60 * 60 * 1000);
        const hours = time.getUTCHours().toString().padStart(2, '0');
        filenames.push({
          temp2m: `2mtemp_${i}_${time.toISOString().split('T')[0]}T${hours}0000Z.jpg`,
          precip: `total_precip_${i}_${time.toISOString().split('T')[0]}T${hours}0000Z.jpg`,
          wind10m: `10mwind_${i}_${time.toISOString().split('T')[0]}T${hours}0000Z.jpg`,
          timestamp: time.toISOString(),
        });
      }
      return filenames;
    };

    const findClosestTimestamp = (currentTime, filenames) => {
      const currentTimeMs = new Date(currentTime).getTime();
      let closest = filenames[0];
      let minDiff = Math.abs(currentTimeMs - new Date(filenames[0].timestamp).getTime());

      for (let i = 1; i < filenames.length; i++) {
        const diff = Math.abs(currentTimeMs - new Date(filenames[i].timestamp).getTime());
        if (diff < minDiff) {
          closest = filenames[i];
          minDiff = diff;
        }
      }

      return {
        temp2m: closest.temp2m.replace(/_\d{4}-\d{2}-\d{2}T\d{6}Z\.jpg$/, '.png'),
        precip: closest.precip.replace(/_\d{4}-\d{2}-\d{2}T\d{6}Z\.jpg$/, '.png'),
        wind10m: closest.wind10m.replace(/_\d{4}-\d{2}-\d{2}T\d{6}Z\.jpg$/, '.png')
      };
    };

    const updateImageUrls = () => {
      const filenames = generateImageFilenames();
      const closestFilename = findClosestTimestamp(currentTime, filenames);

      setImageUrls({
        temp2m: `/images/wrf_output_maps/d01/2mtemp/${closestFilename.temp2m}`,
        precip: `/images/wrf_output_maps/d01/total_precip/${closestFilename.precip}`,
        wind10m: `/images/wrf_output_maps/d01/10mwind/${closestFilename.wind10m}`,
      });
    };

    updateImageUrls();
  }, [currentTime]);

  return (
    <div className="page home">
      <header style={{ backgroundImage: `url(${bg_image})` }}>
        <img src={itu_logo} alt="logo" className="logo-image" />
        <h1>ISTANBUL TECHNICAL UNIVERSITY ATMOSPHERIC MODELLING TEAM</h1>
      </header>

      <div className="utc-time">
        <p>
          {currentTime.toLocaleString("en-US", {
            timeZone: "Europe/Istanbul",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      </div>

      <div className="quick-access-area">
        <h2 className="quick-access-header">QUICK ACCESS</h2>
        <div className="panel-container">
          <Panel
            imageUrl={imageUrls.temp2m}
            altText="2m Temperature"
            labelText="2m Temperature"
            linkUrl="https://www.modelleme.itu.edu.tr/sicaklik.html"
          />
          <Panel
            imageUrl={imageUrls.precip}
            altText="Precipitation"
            labelText="Precipitation"
            linkUrl="https://www.modelleme.itu.edu.tr/yagis.html"
          />
          <Panel
            imageUrl={imageUrls.wind10m}
            altText="10m Wind Speed"
            labelText="10m Wind Speed"
            linkUrl="https://www.modelleme.itu.edu.tr/yukseklik.html"
          />
          <Panel
            imageUrl="/images/era5.png"
            altText="Era5"
            labelText="Era5"
            linkUrl="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels"
          />
          <Panel
            imageUrl="https://www.mgm.gov.tr/FTPDATA/uzal/radar/comp/compppi15.jpg"
            altText="Latest Radar"
            labelText="Latest Radar"
            linkUrl="https://www.mgm.gov.tr/sondurum/radar.aspx?rG=img&rR=00&rU=vil#sfB"
          />
          <Panel
            imageUrl="https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_RGBNatColourEnhncd_EasternEurope.jpg"
            altText="Latest Satellite"
            labelText="Latest Satellite"
            linkUrl="https://eumetview.eumetsat.int/static-images/latestImages.html"
          />
        </div>
      </div>

      {/* ABOUT US SECTION */}
      <section className="about">
        <div>
          <h2>About Us</h2>
          <p>
            The ITU Atmospheric Modeling Team was established in 2015 by
            students of the Meteorological Engineering Department at Istanbul
            Technical University under the guidance of Prof. Dr. Hüseyin Toros.
            Operating under the umbrella of the ITU Meteorological Research
            Club, this specialized team initially focused on researching air
            quality, but their endeavors soon expanded with the effective
            utilization of atmospheric models. With a mission to contribute to
            the improvement of atmospheric models for more accurate weather
            forecasts and longer-term predictions, the team strives to reduce
            inconsistencies in forecasts. Aspiring to be recognized
            internationally for their modeling efforts, the ITU Modeling Team
            engages in daily operations, visualization, and research and
            development on parameterizations using WRF and WRF-Chem models.
          </p>
          <div className="home-card-container">
            <LinkCard
              title="Forecast"
              icon="routine"
              text="Check out our daily WRF model outputs for Turkey's weather. See the forecasted precipitation patterns and stay informed about the upcoming weather conditions."
            />
            <LinkCard
              title="Analysis"
              icon="science"
              text="Explore our visualizations of historical ERA5 analysis results. Check out the data on this page for insights into past weather patterns."
            />
            <LinkCard
              title="Papers"
              icon="article"
              text="You can browse through the research articles we have published."
            />
          </div>
        </div>
      </section>

      {/* JOIN US SECTION */}
      <section className="join-us">
        <div>
          {QUALIFICATIONS.map(({ icon, title, text }) => (
            <div className="qualification" key={title}>
              <span className="material-symbols-outlined">{icon}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="action">
          <h2>Join Us</h2>
          <p>
            If you possess the qualities listed on the side, send us an email
            introducing yourself and including a motivation letter to join us!
          </p>
          <a href="https://asd.com" className="join-button">
            Join Us
          </a>
        </div>
      </section>
    </div>
  );
}
