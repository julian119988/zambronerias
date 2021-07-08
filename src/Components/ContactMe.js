import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled, { css } from "styled-components";
import sendMail from "../Services/sendMail";
import Loader from "react-loader-spinner";
import { useAlert, positions, transitions, types } from "react-alert";

export default function ContactMe(props) {
    const [showContact, setShowContact] = useState(false);
    const [titleIsEmpty, setTitleIsEmpty] = useState(true);
    const [descriptionIsEmpty, setDescriptionIsEmpty] = useState(true);
    const [emailIsEmpty, setEmailIsEmpty] = useState(true);
    const [letterCounter, setLetterCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        email: "",
    });
    const contactRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const emailRef = useRef();
    const alert = useAlert();

    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0.7,
    });

    useEffect(() => {
        if (inView) {
            setShowContact(true);
        }
    }, [inView]);

    useEffect(() => {
        ref(contactRef.current);
        props.sendRef({ contact: contactRef }); // eslint-disable-next-line
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const response = await sendMail(data);
        if (response.status === 200) {
            alert.success("El mail ha sido enviado!");
            event.target.reset();
            setLetterCounter(0);
            setEmailIsEmpty(true);
            setTitleIsEmpty(true);
            setDescriptionIsEmpty(true);
            setData({});
        } else {
            alert.error("No se ha podido enviar el mail");
        }
        setIsLoading(false);
    };
    const isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    };
    const handleFocus = (event) => {
        if (event._reactName === "onFocus") {
            if (event.target.id === "title") setTitleIsEmpty(false);
            if (event.target.id === "description") setDescriptionIsEmpty(false);
            if (event.target.id === "email") setEmailIsEmpty(false);
        } else {
            if (isEmptyOrSpaces(event.target.value)) {
                if (event.target.id === "title") setTitleIsEmpty(true);
                if (event.target.id === "description")
                    setDescriptionIsEmpty(true);
                if (event.target.id === "email") setEmailIsEmpty(true);
                event.target.value = "";
            } else {
            }
        }
    };
    const handleChange = (event) => {
        setData({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            email: emailRef.current.value,
        });
    };
    return (
        <Main ref={contactRef} show={showContact}>
            {isLoading ? (
                <Center>
                    <Loader
                        type="Circles"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                </Center>
            ) : (
                <>
                    <ContactTitle>Envíame un mensaje!</ContactTitle>
                    <Form onSubmit={handleSubmit}>
                        <Container>
                            <Label empty={titleIsEmpty}>Asunto</Label>
                            <Title
                                type="text"
                                required
                                id="title"
                                onFocus={handleFocus}
                                onBlur={handleFocus}
                                onChange={handleChange}
                                ref={titleRef}
                            />
                        </Container>
                        <Container>
                            <Label empty={descriptionIsEmpty}>
                                Descripcion
                            </Label>
                            <Description
                                type="textarea"
                                required
                                maxLength={500}
                                id="description"
                                onFocus={handleFocus}
                                onBlur={handleFocus}
                                onChange={(event) => {
                                    setLetterCounter(event.target.textLength);
                                    handleChange(event);
                                }}
                                ref={descriptionRef}
                            />
                            <Counter>{letterCounter}/500</Counter>
                        </Container>
                        <Container>
                            <Label empty={emailIsEmpty}>Email</Label>
                            <Email
                                type="email"
                                required
                                id="email"
                                onFocus={handleFocus}
                                onBlur={handleFocus}
                                onChange={handleChange}
                                ref={emailRef}
                            />
                        </Container>
                        <SubmitButton type="submit" />
                    </Form>
                </>
            )}
        </Main>
    );
}
const Center = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    align-items: center;
`;
const Counter = styled.span`
    position: absolute;
    bottom: 1vh;
    right: 1vh;
    color: gray;
    font-size: 1.2em;
`;
const ContactTitle = styled.h1`
    margin: 10vh auto 4vh auto;
    font-size: 2.5em;
    width: 100%;
    text-align: center;
`;
const Label = styled.label`
    font-size: 1.8em;
    transition: all 200ms linear;
    width: fit-content;
    height: 3vh;
    ${(props) =>
        props.empty
            ? "transform: translate(1vh, 4.15vh);color: gray; font-size: 1.5em;"
            : null}
`;
const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 1vh 0 1vh 0;
    position: relative;
`;

const Main = styled.div`
    position: relative;
    width: 100%;
    min-height: 40vh;
    max-height: 70vh;
    background-color: #f8f7fc;
    transition: all 600ms ease-out;
    scroll-margin-top: 15vh;
    ${(props) =>
        props.show
            ? "opacity: 1; transform: translateY(0vh);"
            : "opacity: 0; transform: translateY(20vh);"}
    @media (min-width: 800px) {
        max-width: 700px;
        margin: 5vh auto 5vh auto;
        border-radius: 10vh;
        box-shadow: 0px 2px 23px 5px rgb(0 0 0 / 52%);
    }
`;
const Form = styled.form`
    padding: 0 10vh 10vh 10vh;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const InputStyles = css`
    height: 4vh;
    width: 100%;
`;

const Title = styled.input(InputStyles);

const Email = styled.input(InputStyles);

const SubmitButton = styled.input`
    margin: 1vh 1vh 1vh 0;
`;

const Description = styled.textarea`
    resize: none;
    height: 15vh;
    max-height: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    max-height: 30vh;
    &::-webkit-scrollbar {
        display: none;
    }
`;
