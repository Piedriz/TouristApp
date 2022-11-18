import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
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
  width: "100%",
  height: "500px",
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
        <div className="col s12 m7">
          <h2 className="header center-align bold">{sitedetail.title}</h2>
          <div className="card hoverable">
            <div className="card-image">
              <img src={sitedetail.img_path} />
              <a class="btn-floating halfway-fab waves-effect waves-light blue"><i class="material-icons">add</i></a>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <p>{sitedetail.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="card">
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
      </div>
    </>
  );
}
