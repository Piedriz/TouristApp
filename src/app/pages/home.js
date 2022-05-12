import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";

export default function Home() {
  const [sites, setSites] = useState([]);
  useEffect(() => {
    getSites();
  }, []);

  function getSites() {
    const token = document.cookie;
    axios
      .get("/api/home",{
        headers:{
          'authorization': token
          }
      })
      .then((res) => {
        if(!res.data.error){
        setSites(res.data.data)
        }else{
          alert(res.data.message)
        }
      })
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {sites.map((sites) => {
            return (
              <div className="col s4" key={sites._id}>
                <div className="card medium hoverable">
                  <div className="card-image">
                    <img src={sites.img_path} />
                    <span className="card-title">{sites.title}</span>
                  </div>
                  <div className="card-content">
                    <p>{sites.description}</p>
                  </div>
                  <div className="card-action">
                    <a>visit</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
