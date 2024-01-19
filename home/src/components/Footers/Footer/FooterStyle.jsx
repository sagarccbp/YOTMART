import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  align-self: flex-end;
  color: #ffffff;
  min-width: 100%;

  /* @media(max-width:1000px){
        padding:70px 30px
    } */
`;

export const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  color: #0b0e8e;
  flex-wrap: wrap;
  padding: 20px;
  border: 2px solid #0b0e8e;
`;

export const Column = styled.div`
  display: flex;
  ${"" /* width: 20%; */}
  flex-direction: column;

  color: #0b0e8e;
`;

export const Row = styled.div`
  display: flex;
  flex-shrink: calc(100%-20px);
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const FooterLink = styled.a`
  color: #0b0e8e;
  margin-bottom: 10px;
  font-size: 15px;
  text-decoration: none;
`;

export const Heading = styled.p`
  font-size: 20px;
  color: #0b0e8e;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const Icons = styled.div`
  display: flex;
  gap: 10px;
`;
