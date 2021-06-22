import macarons from "../assets/images/macarons.jpg";
import macaronsL from "../assets/images/macarons-landscape.jpg";
import styled, { keyframes } from "styled-components";

export default function Hero(){
    return(
        <Container>
            <Title show={true}>Zambronerias</Title>
        </Container>
        )
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

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 0;
  display: flex;
  justify-content: center;
  ::before {
    content: "";
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 100vh;
    transform: scale(1.1);
    background-image: url(${macarons});
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: center;
    filter: blur(2px);
  }
  @media (min-width: 900px) and (orientation: landscape) {
    ::before {
      content: "";
      z-index: 0;
      position: absolute;
      width: 100%;
      height: 100vh;
      transform: scale(1.1);
      background-image: url(${macaronsL});
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: center;
      background-position-x: center;
      filter: blur(2px);
    }
  }
`;

const Title = styled.h1`
  margin-top: 20vh;
  padding: 0;
  animation: ${fadeIn} 1s ease-in;
  transition: visibility 1s linear;
  height: min-content;
  font-family: "Josefin Sans", sans-serif;
  font-size: 5em;
  color: rgb(79, 40, 50);
  position: relative;
  @media (max-width: 700px) {
  }
`;