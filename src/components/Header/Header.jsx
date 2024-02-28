import { useState } from "react"
import { Container, Logo, LogoutBtn } from "../index"
import { useSelector } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"

function Header() {

    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const location = useLocation()
    const currentPage = location.pathname

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "My Posts",
            slug: "/my-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        },
    ]

    return (
        <header>
            <div className='my-2 mx-4 border-y border-black max-w-auto'>
                <Container>
                    <nav className='flex items-center justify-center sm:justify-between'>
                        <div className='mr-4'>
                            <Link to="/">
                                <Logo width="70px" />
                            </Link>
                        </div>
                        <ul className="hidden sm:flex">
                            {navItems.map(item =>
                                item.active ?
                                    (<li key={item.name}><button
                                        onClick={() => navigate(item.slug)}
                                        className={currentPage === item.slug ? 'inline-block px-6 py-3 shadow-inner shadow-gray-400 duration-200 text-blue-900 border-2 border-gray-400 rounded' : 'inline-block px-6 py-2 my-1 duration-200 hover:text-blue-900 border-x border-black'}
                                    >{item.name}</button></li>) : null)}
                        </ul>
                        <ul className="hidden sm:inline-block">
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                        <button className="absolute text-3xl top-1 right-7 sm:hidden" onClick={toggleSideNav}>{isSideNavOpen ? '×' : '☰'}</button>
                    </nav>
                </Container>
            </div>
            <div className={`sm:hidden transition-transform ease-in-out duration-200 transform ${isSideNavOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                {/* Side Navigation */}
                {isSideNavOpen && (
                    <div className=" bg-slate-500">
                        <div className="flex justify-center p-4">
                            <ul>
                                {navItems.map(item =>
                                    item.active && (
                                        <li key={item.name}>
                                            <button
                                                onClick={() => {
                                                    navigate(item.slug);
                                                    toggleSideNav();
                                                }}
                                                className="block px-4 py-2 text-white hover:bg-gray-600"
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    )
                                )}
                                <ul>
                                    {authStatus && (
                                        <li className=" text-white hover:bg-gray-600">
                                            <LogoutBtn toggleSideNav={toggleSideNav} />
                                        </li>
                                    )}
                                </ul>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )

}

export default Header