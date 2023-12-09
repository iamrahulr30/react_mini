import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {

    const { currentUser } = useAuthContext()

    const handleLogout = async () =>{

        signOut(auth).then(() => {
                console.log("Signed out successfully")
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className="navbar">
            <div className="web-title">
                <Link to = "/">DOGS</Link>
            </div>
            <div className="page-routes">
                <div className="page">
                    <Link to = "/">Home</Link>
                </div>
                {currentUser &&
                    <div className="page">
                     <Link to="/profile">{currentUser.email}</Link>
                    </div>
                }
                {!currentUser && 
                <div className="page">
                    <Link to="/login"> Login </Link>
                </div>}
                {!currentUser && 
                <div className="page">
                    <Link to="/signup">signup</Link>
                </div>}
                {currentUser && 
                    <div className="page">
                        <Link onClick={handleLogout}>Logout</Link>
                    </div>
                }
            </div>
        </div>
    )

}

export default Navbar;