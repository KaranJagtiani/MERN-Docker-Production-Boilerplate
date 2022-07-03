import { Link } from "react-router-dom";

import "./About.scss";

function About() {
  return (
    <div className="text-center">
      <main>
        <h1 class="mt-4 mb-2">Welcome to the About Page!</h1>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}

export default About;
