import React from 'react';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <div className="container" style={{
    marginTop: "35px"
  }}>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link to="/">Back to game</Link>
  </div>
);

export default NotFoundPage;