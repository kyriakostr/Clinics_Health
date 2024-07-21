import { Link } from "react-router-dom";

const Home=()=>{
    return (
        <div>
            <header>
            <h3>
                <Link to='/clinics'>
                Clinics
                </Link>
            </h3>
            
            <h3>
            <Link to='/users'>
                Users
            </Link>
            </h3>

            <h3>
            <Link to='/health-records'>
                Health Records
            </Link>
            </h3>
            </header>
            <h1>
                Home
            </h1>
        </div>
    )
}

export default Home;