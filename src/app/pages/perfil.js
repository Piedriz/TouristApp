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
    roles: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
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
          });
        }
      });
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
    });
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
          <li class="collection-header"><h4>Favoritos</h4></li>
            <li class="collection-item avatar">
              <img src="images/yuna.jpg" alt="" class="circle" />
              <span class="title">Title</span>
              <p>
                First Line <br />
                Second Line
              </p>
              <a href="#!" class="secondary-content">
                <i class="material-icons">delete</i>
              </a>
            </li>
          </ul>
        </div>

        <div className="col s4">
          <ul class="collection with-header">
          <li class="collection-header"><h4>Visitados</h4></li>
            <li class="collection-item avatar">
              <img src="images/yuna.jpg" alt="" class="circle" />
              <span class="title">Title</span>
              <p>
                First Line <br />
                Second Line
              </p>
              <a href="#!" class="secondary-content">
                <i class="material-icons">delete</i>
              </a>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </>
  );
}
