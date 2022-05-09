import React from "react";
import styled from "styled-components";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Div = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justifycontent: center;
  align-items: center;
`;

export default function Register() {
  let navigate = useNavigate();
  function logAlert() {
    let timerInterval;
    Swal.fire({
      icon: 'success',
      title: "Registrado!",
      html: "Usted será redirigido a la página principal.",
      timer: 3000,
      timerProgressBar: true,
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

  function postUser(e) {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    axios
      .post("/api/user/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (!res.data.error){
          document.cookie = `${res.data.token}; path=/; samesite=strict`;
          logAlert()
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: `${res.data.error}`
          })
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
              <h4 className="card-title center-align">Register</h4>
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
                      required  
                      type="password"
                      id="password"
                      className="validate"
                      placeholder="password"
                    />
                  </div>
                </div>
                <div className="row center-align">
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Registrarse
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
            <div className="card-action">
              <Link style={{ color: "#ADD8E6" }} to={"/login"}>
                Inicia seccion!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}
