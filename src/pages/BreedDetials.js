import { useParams } from "react-router-dom";
import useFetch from "../functions/useFetch";

const BreedDetails = () => {
    const { id : name_ } = useParams()

    const { data ,isPending, error} =  useFetch(`https://api.api-ninjas.com/v1/dogs?name=${name_}`)
    // console.log(data)
    // console.log("d" + data.slice(1,-1))

    if ( data !== null ) {
        var obj = JSON.parse(`${data.slice(1,-1)}`)
        console.log("hey " + obj )
    }
    
    var { image_link , good_with_children, good_with_other_dogs ,
        playfulness, protectiveness, trainability, energy, min_life_expectancy, max_life_expectancy, max_height_male,
         max_height_female, max_weight_male, max_weight_female, min_height_male, min_height_female, min_weight_male, min_weight_female } = {...obj}

    return (  
        <div className="breed-details">
            { name_ }
            <p>
                {isPending && <h3>
                    Loading...</h3>}
                {obj && 
                    ( 
                        <div>
                            <div className="img-container">
                            <img 
                                src={ image_link }
                                alt="new"
                            />
                            </div>
                        <h1>Dog Breed Characteristics : {name_}</h1>
                        <div className="characteristics-list">
                          <div><strong>Playfulness:</strong> {playfulness}</div>
                          <div><strong>Protectiveness:</strong> {protectiveness}</div>
                          <div><strong>Trainability:</strong> {trainability}</div>
                          <div><strong>Energy:</strong> {energy}</div>
                          <div><strong>Min Life Expectancy:</strong> {min_life_expectancy}</div>
                          <div><strong>Max Life Expectancy:</strong> {max_life_expectancy}</div>
                          <div><strong>Max Height (Male):</strong> {max_height_male}</div>
                          <div><strong>Max Height (Female):</strong> {max_height_female}</div>
                          <div><strong>Max Weight (Male):</strong> {max_weight_male}</div>
                          <div><strong>Max Weight (Female):</strong> {max_weight_female}</div>
                          <div><strong>Min Height (Male):</strong> {min_height_male}</div>
                          <div><strong>Min Height (Female):</strong> {min_height_female}</div>
                          <div><strong>Min Weight (Male):</strong> {min_weight_male}</div>
                          <div><strong>Min Weight (Female):</strong> {min_weight_female}</div>
                          <div><strong>Good with Children:</strong> {good_with_children}</div>
                          <div><strong>Good with Other Dogs:</strong> {good_with_other_dogs}</div>
                        </div>
                      </div>
                      )

                    
                }
            </p>
        </div>
    );
}
 
export default BreedDetails ;