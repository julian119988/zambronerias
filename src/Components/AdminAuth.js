import { useContext, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import bcrypt from "bcryptjs";

export default function AdminAuth(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const inputRef = useRef();

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
    }, [props.openAdminInput]);

    function handleSubmit(event) {
        event.preventDefault();
        if (inputRef.current.value === process.env.REACT_APP_ADMIN_PASS) {
            props.toggleAdmin();
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(inputRef.current.value, salt);
            localStorage.setItem("adminPass", hash);
            toggleModal();
        } else {
            alert("Wrong password!");
        }
    }

    return (
        <Main show={isOpen} displayH={display} onClick={toggleModal} id="F">
            <Card show={isOpen} displayH={display}>
                <Form onSubmit={handleSubmit}>
                    <Title show={isOpen} displayH={display}>
                        Ingrese la clave
                    </Title>
                    <InputPass
                        show={isOpen}
                        displayH={display}
                        type="password"
                        ref={inputRef}
                    />
                    <InputSubmit
                        show={isOpen}
                        displayH={display}
                        type="submit"
                    />
                </Form>
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
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Title = styled.h2`
    margin: 0;
    padding: 0;
    margin-bottom: 3vh;
    transition: all 0.5s linear;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;
const Card = styled.div`
    height: 70%;
    width: 80%;
    border-radius: 10vh;
    z-index: 6;
    transition: all 0.5s linear;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    will-change: display, background-color;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) =>
        props.show
            ? "background-color: white;"
            : "background-color: transparent;"};
`;
const InputStyles = css`
    z-index: 6;
    transition: all 0.5s linear;
    will-change: display, background-color;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;

const InputPass = styled.input`
    ${InputStyles}
`;

const InputSubmit = styled.input`
    ${InputStyles}
    padding:1.2vh 2vh 1.2vh 2vh;
    border: none;
    border-radius: 1vh;
    margin-top: 3vh;
    background-color: black;
    color: white;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;
