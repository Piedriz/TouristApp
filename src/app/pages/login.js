import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Div = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justifycontent: center;
  align-items: center;
`;

export default function Login() {
  let navigate = useNavigate();
  function logAlert() {
    let timerInterval;
    Swal.fire({
      icon: "success",
      title: "Logueado!",
      html: "Usted será redirigido a la página principal.",
      timer: 3000,
      timerProgressBar: true,
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
        navigate("/home");
      }
    });
  }

  useEffect(() => {
    const token = document.cookie.replace("token=", "");
    axios
      .get("/api/user/login", {
        headers: {
          loginstate: token,
        },
      })
      .then((data) => {
        if (data.data.error) {
          navigate("/home");
        }
      });
  });

  function postUser(e) {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    axios
      .post("/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (!res.data.error) {
          document.cookie = `token=${res.data.token}; path=/; samesite=strict`;
          logAlert();
        } else {
          Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error",
            text: `${res.data.message}`,
          });
        }
      });

    e.preventDefault();
  }
  return (
    <Div>
      <div className="row">
        <div className="col s12">
          <div className="card grey lighten-3">
            <div className="card-content">
              <h4 className="card-title center-align">Login</h4>
              <form onSubmit={postUser}>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input
                      placeholder="email"
                      required
                      type="email"
                      id="email"
                      className="validate"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">vpn_key</i>
                    <input
                      placeholder="password"
                      required
                      type="password"
                      id="password"
                      className="validate"
                    />
                  </div>
                </div>
                <div className="row center-align">
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Iniciar seccion
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
            <div className="card-action">
              <Link style={{ color: "#ADD8E6" }} to={"/register"}>
                Registrate aqui!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}
