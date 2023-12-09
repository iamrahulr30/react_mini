import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createFav } from "../firebase/db";

const SignUp = () => {

    const navigate = useNavigate()

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ confPassword , setConfPassword ] = useState('');

    const [ loading , setLoading ] = useState(false);
    const [ error , setError ] = useState(false);
    const [ message , setMessage ]= useState('')


    const handleSubmit = async (e) => {

        

        setLoading(true)
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            

            const user = userCredential.user;
            createFav(user.uid)
            setLoading(false)
            navigate("/")
            
        })
        .catch((error) => {
            setError(true)
            const errorCode = error.code;
            setMessage(error.message);
            
        });

    }

    return (

        <div className="login-form">
            <form action="POST" className="login" onSubmit={handleSubmit}>
                <label  className="email"> Name : </label>
                <input type="email" name="username" value={email} onChange={(e) => setEmail(e.target.value)}  />

                <label  className="password"> Password : </label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <label  className="confirm_password"> Password : </label>
                <input type="password" name="conf_pass" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>

                <button type="submit"> Register </button>
                <h5 className="redirect-link"><Link to="/login">Click here to Login</Link></h5>
            </form>
            {loading && (
                <div className="msg error">
                     validating... 
                </div>
            )}
            {error && (
                <div className="msg error">
                    { message }
                </div>
            )}
        </div>
    )

}

export default SignUp;