import { useState, useEffect  } from "react"

const useFetch = (url) => {

    console.log("url " + url)
    const [data, setData] = useState(null)
    const [isPending ,setIsPending] = useState(true)
    const [error , SetError] = useState(null)

    useEffect( () =>{
        const abortCont = new AbortController()

      console.log(process.env.REACT_APP_X_API_KEY)

        setTimeout(()=> { fetch(url,{ 
                
                headers : {
                    'X-Api-Key': process.env.REACT_APP_X_API_KEY
                }})
                .then((response) => {
                    if (response.status != 200){
                        throw Error("could not fecth data for that resource")
                    }

                    return response.text();
                  }).then((data) => {
                    setData(data)
                    setIsPending(false)
                  })
                  .catch(error => {
                    SetError(error)
                    setIsPending(false)
                  })
                } , 1000 )

    
        return ()=> abortCont.abort();

            }
    ,[url] );

    return { data, isPending , error }
}
 
export default useFetch;