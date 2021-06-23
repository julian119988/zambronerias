import styled from "styled-components";
import Hero from "./Components/Hero";
import Description from "./Components/Description";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [refs, setRefs] = useState({});

  function getRef(ref) {
    if (ref.description) {
      setRefs(() => {
        let temp = refs;
        temp.description = ref.description;
        return temp;
      });
    } else if (ref.products) {
      setRefs(() => {
        let temp = refs;
        temp.products = ref.products;
        return temp;
      });
    }
  }

  return (
    <Main>
      <Navbar refs={refs} />
      <Hero />
      <Description sendRef={getRef} />
      <Products sendRef={getRef} />
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
