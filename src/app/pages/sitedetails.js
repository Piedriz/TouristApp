import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/navbar";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

const IMG = styled.img`
  width: 100%;
  height: 100%;
`;

export default function SiteDetails() {
  const [sitedetail, setSitedetail] = useState([]);
  const { id } = useParams();

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
          <div className="col s4">
            <p>{sitedetail.description}</p>
          </div>

          <div className="col s6">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}
