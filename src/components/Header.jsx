import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import PageTitle from "./PageTitle";

function Header() {
  return (
    <HeaderStyled>
      <PageTitle title={"Todo-List"} />
      <Navbar />
    </HeaderStyled>
  );
}

const HeaderStyled = styled.section`
  width: 100%;
  text-align: center;
  @media only screen and (max-width: 650px) {
    padding: 10px;
  }
`;

export default Header;
