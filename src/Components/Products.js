import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import getPosts from "../Services/getPosts";
import { base64StringToBlob } from "blob-util";
import Loader from "react-loader-spinner";
import AdminContext from "../Services/AdminContext";
import add from "../assets/images/add.png";
import remove from "../assets/images/remove.png";
import removePost from "../Services/removePost";
import edit from "../assets/images/edit.png";
import AdminModalUpdate from "./AdminModalUpdate";
import ProductDetailModal from "./ProductDetailModal";

export default function Products(props) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imgBlob, setBlob] = useState([]);
    const productRef = useRef();
    const adminContext = useContext(AdminContext);

    useEffect(() => {
        initializeProducts(); // eslint-disable-next-line
    }, []);

    useEffect(() => {
        props.sendRef({ products: productRef }); // eslint-disable-next-line
    }, []);
    function initializeProducts() {
        setIsLoading(true);
        setPostsFromAPI();
    }

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
        if (posts) {
            if (posts[0]) {
                upadteEncoding();
            }
        } // eslint-disable-next-line
    }, [posts]);

    useEffect(() => {
        if (imgBlob.length === posts.length && imgBlob.length !== 0) {
            setIsLoading(false);
        } // eslint-disable-next-line
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
            ) : posts[0] === undefined ? (
                adminContext && (
                    <ItemList
                        index={"8989"}
                        item={{
                            title: "Agregar un post",
                            description: "",
                            price: "$$$",
                        }}
                        imgBlob={add}
                        addPost={props.adminModal}
                    ></ItemList>
                )
            ) : (
                posts.map((item, index) => {
                    return (
                        <>
                            <ItemList
                                restart={initializeProducts}
                                index={index}
                                item={item}
                                imgBlob={imgBlob[index]}
                            ></ItemList>
                            {adminContext && index + 1 === posts.length && (
                                <ItemList
                                    index={"8989"}
                                    item={{
                                        title: "Agregar un post",
                                        description: "",
                                        price: "$$$",
                                    }}
                                    imgBlob={add}
                                    addPost={props.adminModal}
                                ></ItemList>
                            )}
                        </>
                    );
                })
            )}
        </ProductsDiv>
    );
}

function ItemList(props) {
    const { item, addPost, index } = props;
    const [isVisible, setVisible] = useState(false);
    const [openAdminUpdateModal, setAdminUpdateModal] = useState(false);
    const [openProductDetailModal, setProductDetailModal] = useState(false);
    const data = {
        title: item.title,
        description: item.description,
        _id: item._id,
        price: item.price,
        file: props.imgBlob,
    };
    const domRef = useRef();
    const removeRef = useRef();
    const editRef = useRef();
    const adminContext = useContext(AdminContext);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => {
            observer.disconnect();
        };
    }, []);
    function toggleAdminUpdateModal() {
        setAdminUpdateModal(!openAdminUpdateModal);
    }
    function toggleProductDetailModal() {
        setProductDetailModal(!openProductDetailModal);
    }
    function handleClick(e) {
        if (addPost === undefined) {
            if (
                e.target !== removeRef.current &&
                e.target !== editRef.current
            ) {
                toggleProductDetailModal();
            }
        } else {
            addPost();
        }
    }
    async function removeItem(e, id) {
        if (e.target === e.currentTarget) {
            await removePost(id);
            props.restart();
        }
    }
    function editItem(e) {
        if (e.target === e.currentTarget) {
            toggleAdminUpdateModal();
        }
    }
    return (
        <>
            <ItemListDiv
                key={index}
                change={isVisible}
                ref={domRef}
                id={item._id}
                onClick={handleClick}
            >
                <ProductImg src={props.imgBlob} alt={item.description} />
                <ProductInfoDiv>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductPrice>$ {item.price}</ProductPrice>
                </ProductInfoDiv>
                {adminContext && addPost === undefined && (
                    <>
                        <RemoveImg
                            ref={removeRef}
                            src={remove}
                            alt="remove icon"
                            onClick={(e) => removeItem(e, item._id)}
                            right
                        />
                        <RemoveImg
                            ref={editRef}
                            src={edit}
                            alt="edit icon"
                            onClick={(e) => editItem(e, item._id)}
                        />
                    </>
                )}
            </ItemListDiv>
            <AdminModalUpdate data={data} openModal={openAdminUpdateModal} />
            <ProductDetailModal
                data={data}
                openModal={openProductDetailModal}
            />
        </>
    );
}

const RemoveImg = styled.img`
    position: absolute;
    width: 10vh;
    height: 10vh;
    top: 5vh;
    ${(props) => (props.right ? "right: 5vh;" : "left: 5vh;")}
    right: 5vh;
`;
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
    box-shadow: 0px 2px 23px 5px rgba(0, 0, 0, 0.52);
    border-radius: 10%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    position: relative;
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
    justify-content: center;
    scroll-margin-top: 12vh;
`;
const ProductImg = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 10%;
    object-fit: cover;
`;
