import styled from "styled-components";

export default function Navbar(props) {
  function scrollTo(element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  return (
    <NavDiv>
      <NavTitle>Zambronerias</NavTitle>
      <NavList>
        <NavItem onClick={() => scrollTo(props.refs.description.current)}>
          Descripcion
        </NavItem>
        <NavItem onClick={() => scrollTo(props.refs.products.current)}>
          Productos
        </NavItem>
        <NavItem>Contacto</NavItem>
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
  width: fill-available;
  align-items: center;
  padding: 4vh 4vh 0 4vh;
  @media (min-width: 900px) {
    padding: 4vh 16vw 0 16vw;
  }
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
  font-size: 2em;
`;

const NavItem = styled.li`
  padding: 0;
  margin: 0;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 1.25em;
  cursor: pointer;
`;
