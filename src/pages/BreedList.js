
import { Link } from "react-router-dom";

const BreedList = ( { name_  }) => {


    return (
        <div className="breed-name" key={name_}>
            <Link to={`/breed/${name_}`} >
            <h3  className='name-tag'>{ name_ }</h3>
            </Link>
        </div>
    )
}

export default BreedList;