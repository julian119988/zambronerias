import { useState } from "react";
import styled from "styled-components";

export default function Footer(props) {
    const [a, setA] = useState(false);
    return (
        <FooterDiv>
            <button
                onClick={() => {
                    props.adminModal(a);
                    setA(!a);
                }}
            >
                Administrar
            </button>
        </FooterDiv>
    );
}
const FooterDiv = styled.div`
    width: 100%;
    height: 20vh;
    background-color: #f8f7fc;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2em;
`;
