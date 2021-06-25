import styled from "styled-components";
import Hero from "./Components/Hero";
import Description from "./Components/Description";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import AdminModal from "./Components/AdminModal";

function App() {
    const [refs, setRefs] = useState({});
    const [navBarState, setNavBarState] = useState(false);
    const [openAdminModal, setOpenAdminModal] = useState(false);

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

    function changeNavbarColor(state) {
        setNavBarState(!state);
    }

    function changeAdminModal() {
        setOpenAdminModal(!openAdminModal);
    }

    return (
        <Main>
            <Navbar refs={refs} navBarState={navBarState} />
            <AdminModal openModal={openAdminModal} />
            <Hero changeNavbarColor={changeNavbarColor} />
            <Description sendRef={getRef} />
            <Products sendRef={getRef} />
            <Footer adminModal={changeAdminModal} />
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
