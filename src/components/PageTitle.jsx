import React from "react";
import styled from "styled-components";

function PageTitle({ title }) {
  return (
    <PageTitleStyled>
      <h1>{title}</h1>
    </PageTitleStyled>
  );
}

const PageTitleStyled = styled.div`
  h1 {
    text-align: center;
    color: var(--primary);
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-block;
    margin: 30px 0;
  }
`;

export default PageTitle;
