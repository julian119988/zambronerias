import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import getPosts from "../Services/getPosts";
import { base64StringToBlob } from "blob-util";
import Loader from "react-loader-spinner";

export default function Products(props) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imgBlob, setBlob] = useState([]);
    const productRef = useRef();

    useEffect(() => {
        setPostsFromAPI();
    }, []);

    useEffect(() => {
        props.sendRef({ products: productRef }); // eslint-disable-next-line
    }, []);

    function upadteEncoding() {
        let tempList = [];
        posts.forEach(async (item, index) => {
            const base64String = btoa(
                new Uint8Array(item.file.data.data).reduce(function (
                    data,
                    byte
                ) {
                    return data + String.fromCharCode(byte);
                },
                "")
            );
            const blob = base64StringToBlob(
                base64String,
                item.file.contentType
            );
            let urlImg = URL.createObjectURL(blob);
            tempList[index] = urlImg;
        });
        setBlob(tempList);
    }

    async function setPostsFromAPI() {
        getPosts()
            .then((response) => {
                setPosts(response);
            })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        if (posts[0]) {
            upadteEncoding();
        }
    }, [posts]);

    useEffect(() => {
        if (imgBlob.length === posts.length && imgBlob.length != 0) {
            setIsLoading(false);
        }
    }, [JSON.stringify(imgBlob)]);

    return (
        <ProductsDiv ref={productRef}>
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
                posts.map((item, index) => {
                    return (
                        <ItemList
                            key={index}
                            item={item}
                            imgBlob={imgBlob[index]}
                        ></ItemList>
                    );
                })
            )}
        </ProductsDiv>
    );
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
        <ItemListDiv change={isVisible} ref={domRef} id={item._id}>
            <ProductImg src={props.imgBlob} alt={item.description} />
            <ProductInfoDiv>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPrice>$ {item.price}</ProductPrice>
            </ProductInfoDiv>
        </ItemListDiv>
    );
}
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 30vh;
`;
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
