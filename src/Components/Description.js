import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";

export default function Description(props) {
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
    const descriptionRef = useRef();

    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 1,
    });

    useEffect(() => {
        if (inView) {
            setMostrarDescripcion(true);
        }
    }, [inView]);

    useEffect(() => {
        ref(descriptionRef.current);
        props.sendRef({ description: descriptionRef }); // eslint-disable-next-line
    }, []);

    return (
        <DescriptionDiv ref={descriptionRef}>
            <DescriptionP mostar={mostrarDescripcion}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                accusantium quia fugiat placeat, quo impedit voluptates animi
                cumque nisi earum? Reprehenderit laboriosam iure excepturi magni
                animi voluptatibus, quidem consequatur minus dolorum repudiandae
                ex aperiam quisquam rem, reiciendis porro, accusamus repellat
                architecto neque esse praesentium non maxime illo dicta cum.
                Accusantium?
            </DescriptionP>
        </DescriptionDiv>
    );
}

const fadeIn = keyframes`
0%{
  opacity: 0;
}
50%{
  opacity: .2;
}
70%{
  opacity: .5;
}
100%{
  opacity: 1;
}
`;
const DescriptionDiv = styled.div`
    background-color: #f8f7fc;
    min-height: 20vh;
    display: flex;
    padding: 5vh 0 5vh 0;
    justify-content: center;
    scroll-margin-top: 12vh;
`;
const DescriptionP = styled.p`
    margin: 0;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 300px;
    margin-top: 20px;
    font-size: 1.75em;
    text-align: center;
    font-family: "Newsreader", sans-serif;
    animation: ${fadeIn} 1s ease-in;
    transition: visibility 1s linear;

    display: ${(props) => (props.mostar ? "flex" : "none")};
`;
