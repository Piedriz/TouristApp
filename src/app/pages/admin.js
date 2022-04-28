import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from '../../components/navbar'
import Searchbar from '../../components/searchbar'
export default function Admin() {
  const [datos, setDatos] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    img_URL:
      "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text.png",
    img_DATA: null,
  });

  const [searches, setSearches] = useState("");

  useEffect(() => {
    fetchSites();
  }, []);

  function fetchSites() {
    axios
      .get("/api")
      .then((dat) => {
        setDatos(dat.data), console.log(dat.data);
      })
      .catch((err) => console.log(err));
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
    fetch("/appi/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    fetchSites();
  }

  function addSite(e) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("img_URL", data.img_URL);
    formData.append("img_DATA", data.img_DATA);

    axios
      .post("/api", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    e.preventDefault();
    Swal.fire("Sítio registrado!", "Sítio registrado con exito", "success");
    setData({
      title: "",
      description: "",
      img_URL:
        "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text.png",
      img_DATA: null,
    });
    fetchSites();
  }

  function handleChangeTitle(e) {
    setData({
      title: e.target.value,
      description: data.description,
      img_URL: data.img_URL,
      img_DATA: data.img_DATA,
    });
  }
  function handleChangeDescription(e) {
    setData({
      title: data.title,
      description: e.target.value,
      img_URL: data.img_URL,
      img_DATA: data.img_DATA,
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
    });
  }

  return (
    <>
      <Navbar />
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
                <Searchbar searches={searches} setSearches={setSearches} />
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
