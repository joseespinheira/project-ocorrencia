import { Outlet } from "react-router-dom";

function Home() {
    return (
        <div>home
            <Outlet />
        </div>
    );
}

export default Home;
