import styled from "styled-components";
import Hero from "./Components/Hero";
import Description from "./Components/Description";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Main>
      <Navbar />
      <Hero />
      <Description />
      <Products />
      <Footer />
    </Main>
  );
}

export default App;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;
