import React, { useEffect, useState } from 'react';
import logo from '../../assets/movix-logo.svg'
import ContentWrapper from '../contentWrapper/contentWrapper';
import './style.scss'
import { HiOutlineSearch } from "react-icons/hi";
import { useLocation, useNavigate } from 'react-router-dom';


function Header(props) {

    const [searchInput, setsearchInput] = useState(false)
    const [menuItem, setmenuItem] = useState(false)
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    const search = () => {
        setsearchInput(true)
    }

    const searchInputHandler = (e) => {
        if (e.key === "Enter") {
            navigate(`/search/${e.target.value}`)
            setsearchInput(false)
        }
    }

    const nevigatHandler = (type) => {
        if (type === "movie")
            navigate('/explore/movie')
        else
            navigate(`/explore/tv`)
    }

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 position-relative">
                        <nav className={`navbar navbar-expand-sm fixed-top header ${show}`} >
                            <div className="container-fluid ">
                                <img src={logo} alt="Movix logo" className='logo' onClick={() => navigate("/")} />
                                <ul className='ms-auto me-2'>
                                    <li
                                        className="nav-item d-block  d-lg-none d-md-none d-sm-none"
                                        onClick={search}>
                                        search
                                    </li>
                                </ul>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                    {/* id="collapsibleNavbar"     */}
                                    <ul className="navbar-nav ms-auto me-lg-5 ">
                                        <li className="nav-item " data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar"
                                            onClick={() => nevigatHandler("movie")}
                                        >
                                            Movie
                                        </li>
                                        <li className="nav-item " data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar"
                                            onClick={() => nevigatHandler("Tv Show")}>
                                            Tv Show
                                        </li>
                                        <li
                                            className="nav-item d-none d-lg-block d-md-block"
                                            onClick={search}
                                        >
                                            <HiOutlineSearch />
                                            {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {searchInput ? (
                                <div className='text-white position-absolute searchInput d-flex align-item-lg-center ps-lg-5' id='searchBox'>
                                    <input type="text" className='w-90' placeholder='search movie or Tv Show' onKeyUp={searchInputHandler} id='search' />
                                    <i class="fa-solid fa-xmark text-dark ms-auto me-5 mt-3" onClick={(e) => setsearchInput(false)}></i>
                                </div>
                            ) : null}
                        </nav>

                    </div>
                </div >

            </div >

        </>
    );
}

export default Header;


//  {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>
//                         <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
//                             <div class="modal-dialog modal-xl">
//                                 <div class="modal-header bg-white">
//                                     {/* <input type="text" placeholder='search' style={{ border: '0' }} /> */}
//                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" aria-hidden="false"></button>
//                                 </div>
//                             </div>
//                         </div> */}