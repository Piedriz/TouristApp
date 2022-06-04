import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [userperfil, setUserperfil] = useState({
    email: "",
    password: "",
    id: "",
    roles: [],
    favorites: [],
    visits: [],

  });
  const navigate = useNavigate();

  function getUsers(){
    const token = document.cookie.replace("token=", "");
    axios
      .get("/api/user/perfil", {
        headers: {
          usertoken: token,
        },
      })
      .then((data) => {
        if (data.data.error) {
          navigate("/login");
        } else {
          setUserperfil({
            email: data.data.data.email,
            id: data.data.data._id,
            password: "",
            roles: data.data.data.roles,
            favorites: data.data.data.favorites,
            visits: data.data.data.visits
          });
        }
      });
  }

  useEffect(() => {
    getUsers()
  }, []);


  function changePassword(e) {
    console.log(userperfil);
    axios.put("/api/user/" + userperfil.id, userperfil).then((data) => {
      if (!data.data.error) {
        M.toast({ html: data.data.message });
      } else {
        alert(data.data.message);
      }
    });
    setUserperfil({ email: userperfil.email, password: "" });
    e.preventDefault();
  }

  function handleChangePass(e) {
    setUserperfil({
      email: userperfil.email,
      password: e.target.value,
      id: userperfil.id,
      roles: userperfil.roles,
      favorites: userperfil.favorites,
      visits: userperfil.favorites,
    });
  }
  function deletefavorite(idsite){
    const site = {id: idsite}
    axios.put('/api/user/fav/'+userperfil.id, site)
    .then(res =>{
      if(!res.data.error){
        M.toast({ html: res.data.message });
        getUsers()
      }
    })
  }
  function deletevisited(idsite){
    const site = {id: idsite}
    axios.put('/api/user/visited/'+userperfil.id, site)
    .then(res =>{
      if(!res.data.error){
        M.toast({ html: res.data.message });
        getUsers()
      }
    })
  }

  return (
    <>
      <div className="row">
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          <div className="col s4">
            <div className="card">
              <div className="card-content">
                <form onSubmit={changePassword}>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">email</i>
                      <input
                        disabled
                        id="email"
                        type="text"
                        class="validate"
                        value={userperfil.email}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">password</i>
                      <input
                        id="password"
                        type="text"
                        class="validate"
                        placeholder="Nueva contraseña"
                        value={userperfil.password}
                        onChange={handleChangePass}
                        required
                      />
                    </div>
                  </div>

                  <div className="row center-align">
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Actualizar
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col s4">
            <ul class="collection with-header">
              <li class="collection-header">
                <h4>Favoritos</h4>
              </li>

              {userperfil.favorites.map((site) => {
                return (
                  <li class="collection-item avatar" key={site._id}>
                    <img src={site.img_path} alt="" class="circle" />
                    <span class="title">{site.title}</span>
                    <a onClick={()=>deletefavorite(site._id)} class="secondary-content">
                      <i class="material-icons">delete</i>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col s4">
            <ul class="collection with-header">
              <li class="collection-header">
                <h4>Visitados</h4>
              </li>

              {userperfil.visits.map((site) => {
                return (
                  <li class="collection-item avatar" key={site._id}>
                    <img src={site.img_path} alt="" class="circle" />
                    <span class="title">{site.title}</span>
                    <a onClick={()=>deletevisited(site._id)} class="secondary-content">
                      <i class="material-icons">delete</i>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
