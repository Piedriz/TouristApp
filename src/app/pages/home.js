import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  const [sites, setSites] = useState([]);
  useEffect(() => {
    getSites();
  }, []);
  
  function logAlert(err) {
    let timerInterval;
    Swal.fire({
      icon: 'warning',
      title: `${err}`,
      html: "Usted será redirigido al inicio de sección.",
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
        navigate('/login')
      }
    });
  }

  function getSites() {
    const token = document.cookie.replace("token=",'');
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
          document.cookie = "token=; max-age=0"
          console.log(res)
          logAlert(res.data.message)
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
