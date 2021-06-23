import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function Products(props) {
  const [List, setList] = useState(<div>Loading</div>);
  const productRef = useRef();
  const hardcoded = [0, 1, 2, 4];

  useEffect(() => {
    props.sendRef({ products: productRef }); // eslint-disable-next-line
  }, []);

  function setProducts() {
    setList(
      <>
        {hardcoded.map((item, index) => {
          return (
            <div
              key={index}
              style={{ width: "100%", height: "100px", backgroundColor: "red" }}
            ></div>
          );
        })}
      </>
    );
  }
  useEffect(() => {
    setProducts();
  }, []);

  return <ProductsDiv ref={productRef}>{List}</ProductsDiv>;
}

const ProductsDiv = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  background-color: #f8f7fc;
`;
