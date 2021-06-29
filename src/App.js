import styled from "styled-components";
import Hero from "./Components/Hero";
import Description from "./Components/Description";
import Footer from "./Components/Footer";
import Products from "./Components/Products";
import Navbar from "./Components/Navbar";
import { useState, createContext, useEffect, useContext } from "react";
import AdminModal from "./Components/AdminModal";
import AdminAuth from "./Components/AdminAuth";
import bcrypt from "bcryptjs";
import AdminContext from "./Services/AdminContext";

function App() {
    const [refs, setRefs] = useState({});
    const [navBarState, setNavBarState] = useState(false);
    const [openAdminModal, setOpenAdminModal] = useState(false);
    const [adminInput, setAdminInput] = useState(false);
    const [render, setRerender] = useState(false);
    const [admin, setAdmin] = useState(false);
    const value = useContext(AdminContext);

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
    function toggleAdminInput() {
        if (admin) {
            if (adminInput === false) {
                localStorage.removeItem("adminPass");
                alert("Logged out!");
                checkAdmin();
            }
        } else {
            setAdminInput(!adminInput);
        }
    }
    useEffect(() => {
        checkAdmin();
    }, []);

    function toggleAdmin() {
        if (value) {
            setAdmin(false);
        } else {
            setAdmin(true);
        }
    }

    return (
        <AdminContext.Provider value={admin}>
            <Main>
                <Navbar refs={refs} navBarState={navBarState} />
                <AdminModal openModal={openAdminModal} />
                <AdminAuth
                    openAdminInput={adminInput}
                    toggleAdmin={toggleAdmin}
                />
                <Hero changeNavbarColor={changeNavbarColor} />
                <Description sendRef={getRef} />
                <Products sendRef={getRef} adminModal={changeAdminModal} />
                <Footer adminModal={toggleAdminInput} />
            </Main>
        </AdminContext.Provider>
    );
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
`;
export default App;
