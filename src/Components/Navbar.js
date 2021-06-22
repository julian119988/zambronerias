import styled from "styled-components";

export default function Navbar() {
  return (
    <NavDiv>
      <NavTitle>Zambronerias</NavTitle>
      <NavList>
        <NavItem>Hola</NavItem>
        <NavItem>Mundo</NavItem>
        <NavItem>!</NavItem>
      </NavList>
    </NavDiv>
  );
}

const NavDiv = styled.nav`
  background-color: transparent;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  margin: 0 0 0 auto;
  padding: 0;
`;

const NavTitle = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 3em;
`;

const NavItem = styled.li`
  padding: 0;
  margin: 0;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 1.25em;
`;
