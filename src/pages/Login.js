import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const navigate = useNavigate()

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');

    const [ loading , setLoading ] = useState(false);
    const [ error , setError ] = useState(false);
    const [ message , setMessage ]= useState('')

    const handleClick = async (e) => {
        e.preventDefault()

        await signInWithEmailAndPassword(auth , email ,password)
        .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setLoading(false)
                navigate("/")
            })
            .catch((error) => {
                setError(true)
                setLoading(false)
                const errorCode = error.code;
                setMessage(error.message);
                console.log(errorCode);
                
            });
        
        

    }

    return (
        <div className="login-form">
            <form action="POST" className="login" onSubmit={handleClick}>
                <label  className="email"> Name : </label>
                <input type="email" name="username" value={email} onChange={(e) => setEmail(e.target.value)}  />

                <label  className="password"> Password : </label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit"> Login </button>
                <h5 className="redirect-link"><Link to="/signup">Click here to Register</Link></h5>
            </form>
            {error && (
                <div className="msg error">
                    { message }
                </div>
            )}
            {loading && (
                <div className="msg error">
                     validating... 
                </div>
            )}
            
        </div>
    )

}

export default Login;