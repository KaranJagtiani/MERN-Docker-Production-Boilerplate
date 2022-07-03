import { Link } from "react-router-dom";

import "./About.scss";

function About() {
  return (
    <div className="text-center">
      <main>
        <h1 className="mt-4 mb-2">Welcome to the About Page!</h1>
        <p>
          You are never too old to set another goal or to dream a new dream.
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}

export default About;
