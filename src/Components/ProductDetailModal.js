import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProductDetailModal(props) {
    const { title, description, price, file } = props.data;
    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    function toggleModal(event) {
        if (event?.target.id === "F" || event?.target.id === undefined) {
            if (isOpen === false) {
                setDisplay(true);
                setTimeout(() => {
                    setIsOpen(true);
                }, 100);
            } else {
                setIsOpen(false);
                setTimeout(() => {
                    setDisplay(false);
                }, 500);
            }
        }
    }

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
        } else {
            toggleModal();
        } // eslint-disable-next-line
    }, [props.openModal]);

    return (
        <Main show={isOpen} displayH={display} onClick={toggleModal} id="F">
            <Card show={isOpen} displayH={display}>
                <Column show={isOpen} displayH={display} image>
                    <Image
                        src={file}
                        alt={description}
                        show={isOpen}
                        displayH={display}
                    />
                </Column>
                <Row show={isOpen} displayH={display}>
                    <Column
                        show={isOpen}
                        displayH={display}
                        style={{ minWidth: "20vh" }}
                    >
                        <Title show={isOpen} displayH={display}>
                            {title}
                        </Title>
                        <Description show={isOpen} displayH={display}>
                            {description}
                        </Description>
                        <Price show={isOpen} displayH={display} width>
                            $ {price}
                        </Price>
                    </Column>
                    <Column show={isOpen} displayH={display} hide>
                        <Price show={isOpen} displayH={display}>
                            $ {price}
                        </Price>
                    </Column>
                </Row>
            </Card>
        </Main>
    );
}

const Main = styled.div`
    position: fixed;
    z-index: 5;
    width: 100%;
    height: 100vh;
    background-color: black;
    top: 0;
    left: 0;
    transition: all 0.2s linear;
    will-change: display, background-color;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) =>
        props.show
            ? "background-color: rgba(38, 12, 12, 0.8);"
            : "background-color: transparent;"}
`;

const Title = styled.h2`
    margin: 5vh 0 3vh 0;
    padding: 0;
    font-size: 2em;
    font-family: "Newsreader", sans-serif;
    text-align: center;
    transition: all 0.2s linear;
    width: 100%;
    will-change: display, opacity;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;
const Card = styled.div`
    max-width: 90%;
    height: auto;
    width: auto;
    border-radius: 10vh;
    z-index: 6;
    transition: all 0.2s linear;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    will-change: display, background-color;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) =>
        props.show
            ? "background-color: white;"
            : "background-color: transparent;"};
    @media (min-width: 1400px), (orientation: landscape) {
        flex-direction: row;
        max-width: 90%;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    transition: all 0.2s linear;
    will-change: display, opacity;
    justify-content: center;
    align-items: center;
    word-break: break-word;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
    @media (min-width: 1400px), (orientation: landscape) {
        ${(props) => props.image && "max-width: fit-content;"}
        ${(props) => props.image && "height: 70vh; aspect-ratio: 1/1;"}
        ${(props) => props.hide && "display: none;"}
        justify-content: flex-start;
        margin: 0;
    }
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    transition: all 0.2s linear;
    will-change: display, opacity;
    width: 100%;
    border-radius: 0 0 10vh 10vh;
    justify-content: space-around;
    padding: 0 5vh 5vh 5vh;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
    @media (min-width: 1400px) {
        height: 70vh;
        padding: 5vh 0 5vh 0;
    }
`;
const Image = styled.img`
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1 / 1;
    transition: all 0.2s linear;
    will-change: display, opacity;
    object-fit: cover;
    border-radius: 10vh 10vh 0 0;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
    @media (orientation: landscape) {
        max-width: 70vh;
        aspect-ratio: 1 / 1;
        border-radius: 10vh 0 0 10vh;
    }
    @media (orientation: portrait) {
        max-width: fit-content;
    }
`;

const Description = styled.p`
    margin: 0 0 0 0;
    padding: 0;
    font-size: 1.2em;
    font-family: "Newsreader", sans-serif;
    transition: all 0.2s linear;
    will-change: display, opacity;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
    @media (min-width: 1400px), (orientation: landscape) {
        max-width: 20vw;
    }
`;
const Price = styled.h3`
    padding: 0;
    margin: auto 0 0 0;
    font-size: 1.5em;
    width: max-content;
    font-family: "Newsreader", sans-serif;
    transition: all 0.2s linear;
    will-change: display, opacity;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")};
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
    @media (orientation: landscape) {
        ${(props) => (props.width ? "display: flex;" : "display:none;")}
        margin: 0;
    }
    @media (orientation: portrait) {
        ${(props) => (props.width ? "display:none" : "display: flex")}
    }
`;
