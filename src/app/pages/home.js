import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Searchbar from "../../components/searchbar";
import Filtercity from "../../components/filtercity";
import Filtertypesite from "../../components/filtertypesite";
import { Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [searches, setSearches] = useState("");
  const [typeInfo, setTypeInfo] = useState([]);
  const [filtersitetype, setFiltersitetype] = useState("");
  const [sites, setSites] = useState([]);
  const [userperfil, setUserperfil] = useState([])
  const [favs, setFavs] = useState("boder")
  useEffect(() => {
    getSites();
    getUser();
  }, []);

  function logAlert(err) {
    let timerInterval;
    Swal.fire({
      icon: "warning",
      title: `${err}`,
      html: "Usted será redirigido al inicio de sección.",
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {}, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
        navigate("/login");
      }
    });
  }

  function getUser(){
    const token = document.cookie.replace("token=", "");
    axios
      .get("/api/user/perfil", {
        headers: {
          usertoken: token,
        },
      })
      .then((res) => {
        if (res.data.error) {
          navigate("/login");
        } else {
          setUserperfil(res.data.data);
        }
      });
  }

  function getSites() {
    const token = document.cookie.replace("token=", "");
    axios
      .get("/api/home", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        if (!res.data.error) {
          setSites(res.data.data);
          setTypeInfo(res.data.sitesTypes);
        } else {
          document.cookie = "token=; max-age=0";
          console.log(res);
          logAlert(res.data.message);
        }
      });
  }
  function FilterType(sites) {
    for (let i = 0; i <= sites.type_site.length; i++) {
      if (sites.type_site[0].includes(filtersitetype)) {
        return true;
      } else {
        return false;
      }
    }
  }
  function addfavorite(idsite){
    const site = {id: idsite}
    axios.put('/api/user/fav/'+userperfil._id, site)
    .then(res =>{
      if(!res.data.error){
        M.toast({ html: res.data.message });
      }
    })
  }
  function addvisited(idsite){
    const site = {id: idsite}
    axios.put("api/user/visited/"+userperfil._id, site)
    .then(res =>{
      if(!res.data.error){
        M.toast({ html: res.data.message });
      }
    })
  }
  return (
    <>
      <div className="row">
        <Navbar />
      </div>

      <div className="container">
        <div className="row"></div>
        <div className="row">
          <Searchbar searches={searches} setSearches={setSearches} size={"6"} />
          <Filtercity />
          <Filtertypesite
            types={typeInfo}
            setFiltersitetype={setFiltersitetype}
          />
        </div>
        
        <div className="row">
          {sites.map((sites) => {
            if (
              sites.title.toLowerCase().includes(searches.toLowerCase()) &&
              FilterType(sites)
            ) {
              return (
                <div className="col s4" key={sites._id}>
                  <div className="card medium hoverable">
                    <div className="card-image" onClick={()=>{navigate(`/home/${sites._id}`)}}>
                      <img src={sites.img_path} />
                      <span className="card-title">{sites.title}</span>
                    </div>
                    <div className="card-content">
                      <p>{sites.description}</p>
                    </div>
                    <div className="card-action">
                    <a className="btn" onClick={()=>addfavorite(sites._id)}> <i className="small material-icons">favorite</i></a>
                    <a className="btn" onClick={()=>addvisited(sites._id)}> <i className="small material-icons">location_on</i></a>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
