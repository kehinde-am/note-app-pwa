// src/pages/signup.js
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

const SignupPage = ({ data }) => (
  <Layout>
    <Seo title="Sign Up" />
    <h1>Sign Up</h1>
    <form>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  </Layout>
);

export const query = graphql`
  query SignupPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default SignupPage;
