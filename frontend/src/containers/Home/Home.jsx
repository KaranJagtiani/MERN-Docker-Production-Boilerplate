import { Link } from "react-router-dom";

import "./Home.scss";

function Home() {
  return (
    <div className="text-center">
      <main>
        <h1 className="mt-4 mb-2">Welcome to the Home Page!</h1>
        <p>Believe you can and you're halfway there.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </div>
  );
}

export default Home;
