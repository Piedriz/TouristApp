import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Div = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justifycontent: center;
  align-items: center;
`;

export default function Register() {
  return (
    <Div>
      <div className="row">
        <div className="col s12">
          <div className="card grey lighten-3">
            <div className="card-content">
              <h4 className="card-title center-align">Register</h4>
              <form>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input required type="email" id="email" className="validate" />
                    <label>Email</label>
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
                    />
                    <label>Password</label>
                  </div>
                </div>
                <div className="row center-align">
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Registrarse
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
            <div className="card-action">
              <Link style={{color:"#ADD8E6"}} to={"/login"}>Inicia seccion!</Link>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}
