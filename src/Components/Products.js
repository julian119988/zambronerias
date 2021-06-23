import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function Products(props) {
    const [List, setList] = useState(<div>Loading</div>);
    const productRef = useRef();
    const hardcoded = [
        {
            title: "Lemon Pie",
            description: "Un rico lemon pie con lemon y es pie",
            src: "https://storage.googleapis.com/image-products/lemonPie.jpg",
            price: "1000",
        },
        {
            title: "Cheesecake de maracuya",
            description: "Una rica torta de queso de maracuia",
            src: "https://storage.googleapis.com/image-products/cheesecake.jpg",
            price: "1001",
        },
        {
            title: "Marquise",
            description: "Una rica marquise",
            src: "https://storage.googleapis.com/image-products/marquise.jpg",
            price: "1010",
        },
        {
            title: "Lemon Pie",
            description: "Un rico lemon pie con lemon y es pie",
            src: "https://storage.googleapis.com/image-products/lemonPie.jpg",
            price: "1000",
        },
        {
            title: "Cheesecake de maracuya",
            description: "Una rica torta de queso de maracuia",
            src: "https://storage.googleapis.com/image-products/cheesecake.jpg",
            price: "1001",
        },
        {
            title: "Marquise",
            description: "Una rica marquise",
            src: "https://storage.googleapis.com/image-products/marquise.jpg",
            price: "1010",
        },
    ];

    useEffect(() => {
        props.sendRef({ products: productRef }); // eslint-disable-next-line
    }, []);

    function setProducts() {
        setList(
            <>
                {hardcoded.map((item, index) => {
                    return <ItemList key={index} item={item}></ItemList>;
                })}
            </>
        );
    }
    useEffect(() => {
        setProducts(); // eslint-disable-next-line
    }, []);

    return <ProductsDiv ref={productRef}>{List}</ProductsDiv>;
}

function ItemList(props) {
    const { item } = props;
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <ItemListDiv change={isVisible} ref={domRef}>
            <ProductImg src={item.src} alt={item.description} />
            <ProductInfoDiv>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPrice>$ {item.price}</ProductPrice>
            </ProductInfoDiv>
        </ItemListDiv>
    );
}
const ProductInfoDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 3vh;
`;
const ProductTitle = styled.h4`
    margin: 0;
    padding: 0;
`;
const ProductPrice = styled.h4`
    margin: 0;
    padding: 0;
`;

const ItemListDiv = styled.div`
    opacity: 0;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 600ms ease-out, transform 600ms ease-out,
        visibility 1200ms ease-out;
    will-change: opacity, transform, visibility;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3vh;
    border: 1px solid gray;
    border-radius: 10%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    ${(props) =>
        props.change
            ? "opacity: 1; transform: none; visibility: visible;"
            : ""};
    &:hover {
        opacity: 0.7;
    }
`;
const ProductsDiv = styled.div`
    padding: 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    background-color: #f8f7fc;
`;
const ProductImg = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 10%;
    object-fit: cover;
`;
