import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProductDetailModal(props) {
    const { title, description, price, _id, file } = props.data;
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
                <Column show={isOpen} displayH={display}>
                    <Title show={isOpen} displayH={display}>
                        {title}
                    </Title>
                    <Image
                        src={file}
                        alt={description}
                        show={isOpen}
                        displayH={display}
                    />
                </Column>
                <Column show={isOpen} displayH={display}>
                    <Description show={isOpen} displayH={display}>
                        {description}
                    </Description>
                    <Price show={isOpen} displayH={display}>
                        $ {price}
                    </Price>
                </Column>
            </Card>
        </Main>
    );
}

const Main = styled.div`
    position: fixed;
    z-index: 5;
    width: 100%;
    height: 88vh;
    background-color: black;
    top: 12vh;
    left: 0;
    transition: all 0.5s linear;
    will-change: display, background-color;
    justify-content: center;
    align-items: center;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) =>
        props.show
            ? "background-color: rgba(38, 12, 12, 0.8);"
            : "background-color: transparent;"}
`;

const Title = styled.h2`
    margin: 0;
    padding: 0;
    font-size: 2em;
    font-family: "Newsreader", sans-serif;
    text-align: center;
    transition: all 0.5s linear;
    will-change: display, opacity;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;
const Card = styled.div`
    height: 85%;
    width: 80%;
    border-radius: 10vh;
    z-index: 6;
    transition: all 0.5s linear;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    will-change: display, background-color;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) =>
        props.show
            ? "background-color: white;"
            : "background-color: transparent;"};
    @media (min-width: 900px) {
        flex-direction: row;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    transition: all 0.5s linear;
    will-change: display, opacity;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;
const Image = styled.img`
    max-width: 500px;
    aspect-ratio: 1 / 1;
    transition: all 0.5s linear;
    will-change: display, opacity;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;

const Description = styled.p`
    margin: 0;
    padding: 0;
    font-size: 1.2em;
    font-family: "Newsreader", sans-serif;
    transition: all 0.5s linear;
    will-change: display, opacity;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;
const Price = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1.5em;
    font-family: "Newsreader", sans-serif;
    transition: all 0.5s linear;
    will-change: display, opacity;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;
