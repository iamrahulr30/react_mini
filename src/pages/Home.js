import React, { useEffect }  from 'react';
import { useState } from "react";
import BreedList from './BreedList';
import { getFav, updateFav } from '../firebase/db';
import { useAuthContext } from '../hooks/useAuthContext';
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useNavigate } from 'react-router-dom';



const dog_list = require("../data/db.json")

const Home = () => {

    const navigate = useNavigate()
    const  { currentUser }  = useAuthContext()

    const [ dogs , setDogs ] = useState(dog_list)
    const [fav , setFav ] = useState()
    const [ search , setSearch ] = useState('')
    const [ values , setValue ] = useState([250 , 1000])
    const [ vals , setVals ] = useState([250 , 1000])



   useEffect(() => {

    if (currentUser) {

        getFav( currentUser.uid )
        .then((result) => {
            setFav(result)
        })
    }
    else {
        setFav([])
    }


   } , [currentUser])

//    functions
    
    const dislike = (breed) => {
        const array = fav.filter((k) => k!== breed)
        updateFav(array , currentUser.uid )
        setFav(array)

   }

    const like = (breed , e) => {

        if (currentUser) {

        const array = [...fav , breed]
        updateFav(array, currentUser.uid )
        setFav(array)

        }
        else {
            navigate("/login")
        }


   }

   const handleFilter = (seek) => {

    setSearch(seek)
    console.log("search" , search)
    const new_array = dog_list.filter((dogs) => {
        return dogs.breed.includes(seek)  && (dogs.price >= vals[0] && dogs.price <= vals[1])
    })
    

    setDogs(new_array)
   }



   const handleChange = ( event , newValue) => {
    setVals([ newValue[0] * 10 , newValue[1] * 10])
    setValue(newValue)

    const new_array = dog_list.filter((dogs) => {
        return dogs.breed.includes(search)  && (dogs.price >= vals[0] && dogs.price <= vals[1])
    })
    console.log("fil" , new_array)

    setDogs(new_array)

   }

   function valuetext(value) {
    return `${value}°C`;
  }

    return (
        <div className="home">
            {/* search bar */}
            <div className="search">
                <input type="text" placeholder='Search' value={search} onChange={(e) => {
                    handleFilter(e.target.value)
                }}/>
                <h3 className="slider-range">Price range</h3>
                <p>{vals[0]}- {vals[1]}</p>
                <Box sx={{ width: 200 }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={values}
                        onChange={handleChange}
                        // valueLabelDisplay="auto"
                        // getAriaValueText={valuetext}
                    />
                </Box>
            </div>

            {dogs.map ( (dog) => 
                ( 
                    <div className='rec'>
                        <BreedList name_={dog.breed} key={dog.id}/> 
                        <small class="dollar">${dog.price}</small>
                        {fav && fav.includes(dog.breed) ?
                         
                        <div className='like' id={dog.breed} onClick={() => dislike(dog.breed)}>
                            <FcLike />
                        </div> : 
                        <div className='recin' id={dog.breed} onClick={(e) => like(dog.breed , e)}>
                            <CiHeart />
                        </div>}
                    </div>
                     
                 
                )
            
            )}

        </div>
    );
}
 
export default Home;