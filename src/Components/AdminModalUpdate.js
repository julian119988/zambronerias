import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import updatePost from "../Services/updatePost";

export default function AdminModalUpdate(props) {
    const { title, description, price, _id } = props.data;
    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [data, setData] = useState({
        title: title,
        description: description,
        price: price,
        _id: _id,
    });
    const inputTitleRef = useRef();
    const inputDescriptionRef = useRef();
    const inputPriceRef = useRef();

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

    function handleSubmit(event) {
        event.preventDefault();
        updatePost(data);
        event.target.reset();
        toggleModal();
        setData({});
    }

    function handleChange() {
        setData({
            _id: _id,
            title: inputTitleRef.current.value,
            description: inputDescriptionRef.current.value,
            price: inputPriceRef.current.value,
        });
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
                <Title show={isOpen} displayH={display}>
                    Editar Post
                </Title>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Container>
                        <Label show={isOpen} displayH={display}>
                            Titulo
                        </Label>
                        <InputTitle
                            type="text"
                            show={isOpen}
                            displayH={display}
                            placeholder="Titulo"
                            ref={inputTitleRef}
                            onChange={handleChange}
                            defaultValue={title}
                            required
                        />
                    </Container>
                    <Container>
                        <Label show={isOpen} displayH={display}>
                            Descripcion
                        </Label>
                        <InputDescription
                            type="text"
                            show={isOpen}
                            displayH={display}
                            placeholder="Descripcion"
                            ref={inputDescriptionRef}
                            onChange={handleChange}
                            defaultValue={description}
                            required
                        />
                    </Container>

                    <Container>
                        <Label show={isOpen} displayH={display}>
                            Precio
                        </Label>
                        <InputPrice
                            type="number"
                            show={isOpen}
                            displayH={display}
                            placeholder="Precio"
                            ref={inputPriceRef}
                            onChange={handleChange}
                            defaultValue={price}
                            required
                        />
                    </Container>
                    <InputButton
                        type="submit"
                        show={isOpen}
                        displayH={display}
                        onChange={handleChange}
                        value="Subir"
                    />
                </Form>
            </Card>
        </Main>
    );
}
const Label = styled.label`
    font-size: 1.2em;
    font-family: "Newsreader", sans-serif;
    transition: all 0.5s linear;
    will-change: display, opacity;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

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
    transition: all 0.5s linear;
    will-change: display, opacity;
    font-size: 2em;
    font-family: "Newsreader", sans-serif;
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
    justify-content: flex-end;
    will-change: display, background-color;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) =>
        props.show
            ? "background-color: white;"
            : "background-color: transparent;"};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 50vh;
    padding-bottom: 5vh;
`;
const InputStyles = css`
    z-index: 6;
    transition: all 0.5s linear;
    will-change: display, background-color;
    font-size: 1.2em;
    font-family: "Newsreader", sans-serif;
    ${(props) => (props.displayH ? "display: flex;" : "display: none;")}
    ${(props) => (props.show ? "opacity: 1;" : "opacity: 0;")};
`;

const InputTitle = styled.input`
    ${InputStyles}
`;

const InputDescription = styled.input`
    ${InputStyles}
`;

const InputImage = styled.input`
    ${InputStyles}
    display: none;
`;

const InputPrice = styled.input`
    ${InputStyles}
`;

const InputButton = styled.input`
    ${InputStyles}
`;
