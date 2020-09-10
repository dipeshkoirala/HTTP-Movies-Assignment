import React,{useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom'

import axios from 'axios'

const initialItem=
{
    id:"",
    title:'',
    director:'',
    metascore:'',
    stars:[]
}


const UpdateMovie=(props)=>{
    
    const [mov,setMov]=useState(initialItem)
    const {push}=useHistory();
    const {id}=useParams();
    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res)=>{
            
           // console.log(res.data)
            setMov(res.data)
        })
        .catch((err)=>console.log(err))
    },[id])

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'metascore') {
          value = parseInt(value);
        }
    
        setMov({
          ...mov,
          [ev.target.name]: value
        });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
          .put(`http://localhost:5000/api/movies/${id}`, mov)
          .then((res) => {
            // res.data
console.log("this is props.addSaveItem",props.addSavedItem)
console.log("this is setMovieList",props.setMovieList)
            props.setMovieList(res.data);
            push(`/movie-list/${id}`);
          })
          .catch((err) => console.log(err));
      };
    
return(
    <div>Update of the movie
 <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="MovieTitle"
        value={mov.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={mov.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="director"
          value={mov.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={mov.stars}
        />
        <div className="baseline" />
        <button
        className="md-button"
        onClick={() => push(`/update-movie/${mov.id}`)}
      >
        Edit
      </button>
        
      </form>



    </div>
)
}
export default UpdateMovie