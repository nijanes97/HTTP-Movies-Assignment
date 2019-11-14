import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialMovie = {
    title: '',
    director: '',
    stars: [],
    metascore: ''
}

function MovieForm(props) {
    const [movie, setMovie] = useState(initialMovie);
    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if(e.target.name === 'stars') {
            value = value.split(',')
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };
    console.log(props)
    useEffect(() => {
        setMovie(props.location.state);
    }, [props.location.state]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                props.history.push('/movies');
            })
            .catch(er => console.log(er))
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="Title"
                value={movie.title}
                />
                <input
                type="number"
                name="metascore"
                onChange={changeHandler}
                placeholder="Metascore"
                value={movie.metascore}
                />
                <input
                type="string"
                name="stars"
                onChange={changeHandler}
                placeholder="Stars"
                value={movie.stars.toString()}
                />
                <input
                type="string"
                name="director"
                onChange={changeHandler}
                placeholder="Description"
                value={movie.director}
                />
                <button className="md-button form-button">Update</button>
            </form>
        </div>
    )
}

export default MovieForm;