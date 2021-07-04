import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Navbar(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    function scrollTo(element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
    async function asd() {
        const response = await axios.get("http://localhost:8080/asd");
        console.log(response);
    }

    return (
        <NavDiv navBarState={props.navBarState}>
            <NavTitle>Zambronerias</NavTitle>
            <HamburgerMenu
                open={menuOpen}
                onClick={() => {
                    setMenuOpen(!menuOpen);
                    asd();
                }}
            >
                <Line marginB open={menuOpen} top />
                <Line open={menuOpen} center />
                <Line marginT open={menuOpen} bottom />
            </HamburgerMenu>
            <NavList>
                <NavItem
                    onClick={() => scrollTo(props.refs.description.current)}
                >
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

const Line = styled.span`
    background-color: red;
    width: 100%;
    height: 20%;
    border-radius: 1vh;
    transition: transform 0.25s ease-out
        ${(props) => (props.open ? "" : ",opacity 0.25s ease-in 0.25s")};
    ${(props) => (props.marginT ? "margin-top: auto;" : "")};
    ${(props) => (props.marginB ? "margin-bottom: auto;" : "")};
    ${(props) =>
        props.open === false
            ? ""
            : props.top
            ? "transform: rotate(45deg) translateY(2.3vh);"
            : props.bottom
            ? "transform: rotate(-45deg) translateY(-2.3vh);"
            : "opacity: 0;"}
`;

const NavDiv = styled.nav`
    height: 12vh;
    background-color: transparent;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: fill-available;
    align-items: center;
    padding: 4vh;
    transition: background-color 0.5s ease-in, opacity 0.5s linear,
        color 0.5s linear;
    ${(props) =>
        props.navBarState
            ? "background-color: #895257; opacity: 0.87; color: white;"
            : ""}
    @media (min-width: 900px) {
        padding: 4vh 16vw 4vh 16vw;
    }
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0 0 0 auto;
    padding: 0;
    @media (max-width: 600px) {
        display: none;
    }
`;
const HamburgerMenu = styled.div`
    display: flex;
    margin-left: auto;
    cursor: pointer;
    width: 4vh;
    height: 4vh;
    flex-direction: column;
    transition: all 0.25s ease-out;
    ${(props) => (props.open === false ? "" : "transform: translateX(1.15vh);")}
    @media (min-width: 601px) {
        display: none;
    }
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
