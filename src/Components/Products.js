import styled from "styled-components";

export default function Products() {
  return (
    <ProductsDiv>
      <div
        style={{ width: "100px", height: "100px", backgroundColor: "red" }}
      ></div>
      <div
        style={{ width: "100px", height: "100px", backgroundColor: "red" }}
      ></div>
      <div
        style={{ width: "100px", height: "100px", backgroundColor: "red" }}
      ></div>
      <div
        style={{ width: "100px", height: "100px", backgroundColor: "red" }}
      ></div>
    </ProductsDiv>
  );
}

const ProductsDiv = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  background-color: #f8f7fc;
`;
