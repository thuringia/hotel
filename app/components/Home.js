// @flow
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div data-tid="container">
        <h2>Home</h2>
        <Link to="/counter">to Counter</Link>
      </div>
    </div>
  );
}
