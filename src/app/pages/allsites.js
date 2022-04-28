
import React, {useEffect, useState} from 'react'
import reactDom from 'react-dom'
import Swal from 'sweetalert2'
import Navbar from '../../components/navbar';
import Searchbar from '../../components/searchbar';



export default function Allsites(props){
    
    const [datos, setDatos] = useState([]);
    const [searches, setSearches] = useState('')

    useEffect(()=>{
        fetchSites();
     },[]);

     function fetchSites(){
        fetch('/api')
        .then(res => res.json())
        .then(data => {
            setDatos(data)
            console.log(data)
        });  
     }
    
    function handleDelete(id){
        fetch('/api/'+ id, {
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
            Swal.fire(
                'Sítio eliminado!',
                'Sítio eliminado con exito',
                'success'
              )
        fetchSites();  
    }
    function handleEdit(id){
        fetch('/appi/'+ id, {
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
         
        fetchSites();  
    }

    

    
    return(
        <>
        <Navbar/>
        <div className='container'>
        <img/>
            <div className='row'>
                <div className='col s12'>
                    <Searchbar searches={searches} setSearches={setSearches}/>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map(site =>{
                                    if(site.title.toLowerCase().includes(searches.toLowerCase())){
                                    return(
                                        <tr key={site._id}>
                                            <td>{site.title}</td>
                                            <td>{site.description}</td>
                                            <td><img src={site.img_path} height='70px' width='70px'/></td>
                                            <td><a className="waves-effect waves-light btn" onClick={()=>handleDelete(site._id)}>eliminar</a>
                                            <a className="waves-effect waves-light btn" onClick={()=>handleEdit(site._id)}>editar</a></td>
                                        </tr>
                                    );
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}

