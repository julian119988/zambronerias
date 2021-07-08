import styled from "styled-components";
import Hero from "./Components/Hero";
import Description from "./Components/Description";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import Navbar from "./Components/Navbar";
import { useState, useEffect } from "react";
import AdminModalPost from "./Components/AdminModalPost";
import bcrypt from "bcryptjs";
import AdminContext from "./Services/AdminContext";
import ContactMe from "./Components/ContactMe";

function App() {
    const [refs, setRefs] = useState({});
    const [navBarState, setNavBarState] = useState(false);
    const [openAdminModal, setOpenAdminModal] = useState(false);
    const [admin, setAdmin] = useState(false);

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
        } else {
            setRefs(() => {
                let temp = refs;
                temp.contact = ref.contact;
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
    function checkAdmin() {
        const savedAdmin = localStorage.getItem("adminPass");
        bcrypt.compare(
            process.env.REACT_APP_ADMIN_PASS,
            savedAdmin,
            function (err, res) {
                if (res === true) {
                    setAdmin(true);
                } else {
                    setAdmin(false);
                }
            }
        );
    }

    useEffect(() => {
        checkAdmin();
    }, []);

    return (
        <AdminContext.Provider value={admin}>
            <Main>
                <Navbar refs={refs} navBarState={navBarState} />
                <AdminModalPost openModal={openAdminModal} />
                <Hero changeNavbarColor={changeNavbarColor} />
                <Description sendRef={getRef} />
                <Products sendRef={getRef} adminModal={changeAdminModal} />
                <ContactMe sendRef={getRef} />
                <Footer />
            </Main>
        </AdminContext.Provider>
    );
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    background-color: #f8f7fc;
`;
export default App;
