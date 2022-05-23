import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../../components/navbar";
import Searchbar from "../../components/searchbar";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
export default function Admin() {
  const [datos, setDatos] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    img_URL:
      "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text.png",
    img_DATA: null,
    type_site: "Otro",
    _id: ''
  });

  const [searches, setSearches] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    fetchSites();
  }, []);

  const options = [
    { value: "Playa", label: "Playa" },
    { value: "Atractivo histórico", label: "Atractivo historico" },
    { value: "Parque", label: "Parque" },
    { value: "Centro comercial", label: "Centro comercial" },
    { value: "Museo", label: "Museo" },
    { value: "Zoológico", label: "Zoológico" },
    { value: "Reserva natural", label: "Reserva natural" },
    { value: "Parque de diversión", label: "Parque de diversión" },
    { value: "Espectaculo", label: "Teatros, estadios deportivos, cine" },
    { value: "Otro", label: "Otro" },
  ];
  const animatedComponents = makeAnimated();

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

  function fetchSites() {
    const token = document.cookie.replace("token=", "");
    axios
      .get("/api", {
        headers: {
          authorization: token,
        },
      })
      .then((dat) => {
        if (!dat.data.error) {
          setDatos(dat.data.data), console.log(dat);
        } else {
          document.cookie = "token=; max-age=0";
          logAlert(dat.data.message);
        }
      });
  }

  function handleDelete(id) {
    fetch("/api/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    Swal.fire("Sítio eliminado!", "Sítio eliminado con exito", "success");
    fetchSites();
  }
  function handleEdit(id) {
    fetch("/api/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data),
        setData({
          title: data.title,
          description: data.description,
          img_URL: data.img_URL,
          img_DATA: data.img_DATA,
          type_site: data.type_site,
          _id: data._id,
        });
      })
      .catch((err) => console.log(err));
  }

  function addSite(e) {
    if (data._id){
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("img_URL", data.img_URL);
      formData.append("img_DATA", data.img_DATA);
      formData.append("type_site", data.type_site);

      axios.put("/api/"+data._id,formData)
        .then((data) =>{
          Swal.fire(
            "Sítio Editado!",
            `${data.data.message}`,
            "success"
          );
        });
        setData({
          title: "",
          description: "",
          img_URL:
            "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text.png",
          img_DATA: null,
          type_site: "Otro",
          _id: ''
        });
        fetchSites()
        e.preventDefault()
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("img_URL", data.img_URL);
      formData.append("img_DATA", data.img_DATA);
      formData.append("type_site", data.type_site);
      axios.post("/api", formData).then((res) => {
        if (!res.data.error) {
          console.log("seguro");
          Swal.fire(
            "Sítio registrado!",
            "Sítio registrado con exito",
            "success"
          );
          setData({
            title: "",
            description: "",
            img_URL:
              "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text.png",
            img_DATA: null,
            type_site: "Otro",
            _id: ''
          });

          fetchSites();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al enviar",
            text: `${res.data.message}`,
          });
        }
      });
      e.preventDefault();
    }
  }

  function handleChangeTitle(e) {
    setData({
      title: e.target.value,
      description: data.description,
      img_URL: data.img_URL,
      img_DATA: data.img_DATA,
      type_site: data.type_site,
      _id: data._id
    });
  }
  function handleChangeDescription(e) {
    setData({
      title: data.title,
      description: e.target.value,
      img_URL: data.img_URL,
      img_DATA: data.img_DATA,
      type_site: data.type_site,
      _id: data._id
    });
  }
  function handleChangeImg(e) {
    const nform = document.querySelector("#form");
    const formData1 = new FormData(nform);
    const file = formData1.get("image");
    setData({
      title: data.title,
      description: data.description,
      img_URL: URL.createObjectURL(file),
      img_DATA: file,
      type_site: data.type_site,
      _id: data._id
    });
  }

  function handleChangeType(e) {
    const values = e.map((type) => type.value);
    console.log();
    setData({
      title: data.title,
      description: data.description,
      img_URL: data.img_URL,
      img_DATA: data.img_DATA,
      type_site: values,
      _id: data._id
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
                <form onSubmit={addSite} id="form">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        required
                        name="title"
                        value={data.title}
                        onChange={handleChangeTitle}
                        placeholder="Título"
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        required
                        name="description"
                        value={data.description}
                        onChange={handleChangeDescription}
                        placeholder="Descripción"
                        className="materialize-textarea"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="file-field input-field">
                      <div className="btn">
                        <span>IMG</span>
                        <input
                          required
                          onChange={handleChangeImg}
                          name="image"
                          type="file"
                        ></input>
                      </div>
                      <div className="file-path-wrapper">
                        <input
                          name="image"
                          className="file-path validate "
                          type="text"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <Select
                        isClearable
                        options={options}
                        isMulti
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        onChange={handleChangeType}
                      />
                    </div>
                  </div>
                  <div className="row center-align">
                    <div className=" col s12">
                      <img
                        className="responsive-img"
                        src={data.img_URL}
                        width="150"
                        height="150"
                        alt="img_site"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-light darken-4">
                    subir
                    <i className="material-icons right">send</i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col s8">
            <div className="card">
              <div className="card-content">
                <Searchbar searches={searches} setSearches={setSearches} size={"12"} />
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datos.map((site) => {
                      if (
                        site.title
                          .toLowerCase()
                          .includes(searches.toLowerCase())
                      ) {
                        return (
                          <tr key={site._id}>
                            <td>{site.title}</td>
                            <td>{site.description}</td>
                            <td>
                              <img
                                src={site.img_path}
                                height="70px"
                                width="70px"
                              />
                            </td>
                            <td>
                              <a
                                className="waves-effect waves-light btn"
                                onClick={() => handleDelete(site._id)}
                              >
                                eliminar
                              </a>
                              <a
                                className="waves-effect waves-light btn"
                                onClick={() => handleEdit(site._id)}
                              >
                                editar
                              </a>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
