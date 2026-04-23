import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { useState} from "react";
import {Link} from "react-router";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar className="navbar navbar-expand-lg" sticky="top">
            <NavbarBrand>PAO Reporting</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto flex-md-row-reverse" navbar>
                    <NavItem>
                        <Link to="/" className={"nav-link"}>Home <i className="fa-solid fa-house"></i></Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/dashboard" className={"nav-link"}>Dashboard</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/headquartersDashboard" className={"nav-link"}>HQ Dashboard</Link>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}


export default NavBar;
