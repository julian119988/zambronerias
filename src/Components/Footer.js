import styled from "styled-components";
import instagramIcon from "../assets/images/instagram.png";
import whatsappIcon from "../assets/images/whatsapp.png";
import facebookIcon from "../assets/images/facebook.png";

export default function Footer(props) {
    const goToFacebook = () => {
        window
            .open(
                "https://www.facebook.com/Zambroner%C3%ADas-104849541306664/",
                "_blank"
            )
            .focus();
    };
    const goToInstagram = () => {
        window
            .open("https://www.instagram.com/zambronerias/", "_blank")
            .focus();
    };
    const goToWhatsapp = () => {
        window.open("https://wa.link/n1n30g", "_blank").focus();
    };

    return (
        <FooterDiv>
            <Title>O contactame en mis redes</Title>
            <MediaDiv>
                <MediaIcons
                    src={instagramIcon}
                    alt="Instagram icon"
                    onClick={goToInstagram}
                />
                <MediaIcons
                    src={whatsappIcon}
                    alt="Facebook icon"
                    onClick={goToWhatsapp}
                />
                <MediaIcons
                    src={facebookIcon}
                    alt="Whatsapp icon"
                    onClick={goToFacebook}
                />
            </MediaDiv>
        </FooterDiv>
    );
}
const Title = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1em;
    text-align: center;
    font-family: "Newsreader", sans-serif;
`;
const MediaDiv = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 5vh;
    margin-bottom: 5vh;
`;
const MediaIcons = styled.img`
    width: 10vh;
    height: 10vh;
    cursor: pointer;
    transition: all 200ms linear;
    will-change: opacity, height, width;
    &:hover {
        opacity: 0.5;
        width: 12vh;
        height: 12vh;
    }
`;
const FooterDiv = styled.div`
    width: 100%;
    height: auto;
    background-color: #f8f7fc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2em;
    padding-top: 5vh;
`;
