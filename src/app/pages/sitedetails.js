import axios from "axios";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/navbar";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

const IMG = styled.img`
  width: 100%;
  height: 100%;
`;
const containerStyle = {
  width: "400px",
  height: "400px",
};

export default function SiteDetails() {
  const [sitedetail, setSitedetail] = useState([]);
  const { id } = useParams();

  const position = {
    lat: parseFloat(sitedetail.lat),
    lng: parseFloat(sitedetail.lng),
  };
  

  useEffect(() => {
    getSite();
  }, []);

  function getSite() {
    axios.get(`api/home/${id}`).then((res) => {
      setSitedetail(res.data.data);
    });
  }

  console.log(sitedetail);
  return (
    <>
      <div className="row">
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          <h3>{sitedetail.title}</h3>
        </div>

        <div className="row">
          <div className="col s12 center-align">
            <IMG className="center-align" src={sitedetail.img_path} />
          </div>
        </div>

        <div className="row">
          <div className="col s6">
            <p>{sitedetail.description}</p>
          </div>

          <div className="col s6">
            <LoadScript googleMapsApiKey="AIzaSyCsmL7V9o4e-A-YyRY0kyXIhpLoyRBV5iU">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={12}
              >
                <Marker position={position} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </>
  );
}
