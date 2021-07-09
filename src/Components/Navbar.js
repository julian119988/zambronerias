import { useState } from "react";
import styled from "styled-components";

export default function Navbar(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showList, setShowList] = useState(false);
    function scrollTo(element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    function toggleMenu() {
        const scrollY = document.body.style.top;
        const numberScroll = `${window.scrollY}`;
        if (menuOpen) {
            document.body.style.position = "";
            document.body.style.top = "";
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
            setMenuOpen(false);
            setShowList(false);
        } else {
            document.body.style.position = "fixed";
            document.body.style.top = `-${numberScroll}px`;
            setMenuOpen(true);
            setTimeout(() => setShowList(true), 200);
        }
    }
    return (
        <>
            <NavDiv navBarState={props.navBarState} menuOpen={menuOpen}>
                <NavTitle>Zambronerias</NavTitle>
                <HamburgerMenu
                    open={menuOpen}
                    onClick={() => {
                        toggleMenu();
                    }}
                >
                    <Line
                        marginB
                        open={menuOpen}
                        top
                        navBarState={props.navBarState}
                    />
                    <Line
                        open={menuOpen}
                        center
                        navBarState={props.navBarState}
                    />
                    <Line
                        marginT
                        open={menuOpen}
                        bottom
                        navBarState={props.navBarState}
                    />
                </HamburgerMenu>
                <NavList>
                    <NavItem
                        onClick={() => scrollTo(props.refs.description.current)}
                    >
                        Descripcion
                    </NavItem>
                    <NavItem
                        onClick={() => scrollTo(props.refs.products.current)}
                    >
                        Productos
                    </NavItem>
                    <NavItem
                        onClick={() => scrollTo(props.refs.contact.current)}
                    >
                        Contacto
                    </NavItem>
                </NavList>
            </NavDiv>
            <Menu navBarState={props.navBarState} show={menuOpen}>
                <VerticalList show={menuOpen} showList={showList}>
                    <NavItem
                        onClick={() => {
                            toggleMenu();
                            scrollTo(props.refs.description.current);
                        }}
                    >
                        Descripcion
                    </NavItem>
                    <NavItem
                        onClick={() => {
                            toggleMenu();
                            scrollTo(props.refs.products.current);
                        }}
                    >
                        Productos
                    </NavItem>
                    <NavItem
                        onClick={() => {
                            toggleMenu();
                            scrollTo(props.refs.contact.current);
                        }}
                    >
                        Contacto
                    </NavItem>
                </VerticalList>
            </Menu>
        </>
    );
}

const Menu = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    left: 0;
    width: 100%;
    min-height: 0;
    background-color: #895257;
    opacity: 0.87;
    top: 0;
    ${(props) => (props.navBarState ? "top: 12vh;" : "top: 0;")}
    transition: min-height 200ms linear;
    z-index: 20;
    ${(props) =>
        props.navBarState
            ? props.show && "min-height: 88vh;"
            : props.show && "min-height: 100vh; padding-top: 12vh;"};
    @media (min-width: 601px) {
        display: none;
    }
`;
const VerticalList = styled.ul`
    list-style: none;
    height: 88vh;
    transition: opacity 200ms linear;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 0;
    padding: 10vh 0 10vh 0;
    color: white;
    font-size: 1.7em;

    ${(props) => (props.showList ? "display: flex;" : "display: none;")};
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;

const Line = styled.span`
    background-color: white;
    width: 100%;
    height: 0.3vh;
    transition: all 0.25s ease-out;
    ${(props) =>
        props.open
            ? "width:100% !important; background-color: white !important; "
            : ""};
    ${(props) =>
        props.marginT
            ? "margin-top: auto; margin-right: auto; width: 60%;"
            : ""};
    ${(props) =>
        props.marginB
            ? "margin-bottom: auto; margin-left: auto; width: 60%;"
            : ""};
    ${(props) =>
        props.open === false
            ? ""
            : props.top
            ? "transform: rotate(45deg) translateY(2.6vh);"
            : props.bottom
            ? "transform: rotate(-45deg) translateY(-2.6vh);"
            : "opacity: 0;"}
    ${(props) =>
        props.navBarState
            ? "background-color: white;"
            : "background-color: black;"}
`;

const NavDiv = styled.nav`
    height: 12vh;
    background-color: transparent;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: fill-available;
    align-items: center;
    padding: 4vh;
    transition: background-color 0.5s ease-in, opacity 0.5s linear,
        color 0.2s linear;
    ${(props) =>
        props.navBarState
            ? "background-color: #895257; opacity: 0.87; color: white;"
            : ""}
    ${(props) => (props.menuOpen ? "color: white;" : "")}
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
    font-size: 2.5em;
    font-family: "Josefin Sans", sans-serif;
    font-weight: 600;
    @media (min-width: 900px) {
        font-size: 3em;
    }
`;

const NavItem = styled.li`
    padding: 0;
    margin: 0;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 1.5em;
    cursor: pointer;
    font-family: "Josefin Sans", sans-serif;
    font-weight: 600;
    @media (min-width: 900px) {
        font-size: 2em;
    }
`;
