import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import i18n from '../i18n';
import authService from './api-authorization/AuthorizeService';
import $ from 'jquery';
import { NavDropdown } from 'react-bootstrap';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor (props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isAuthenticated: false,
            role: null
        };

        i18n.loadNamespaces('navbar');

    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    changeRole(role) {
        this.state.role = role != null ? role.RightLabel : null;
        this.forceUpdate();
    }

    newUserConnected(authUser) {
        
        var user = {
            "Id": -1,
            "IdAspNetUser": authUser.sub,
            "Email": authUser.name,
            "Firstname": "",
            "LastName": "",
            "LicenceId": "",
            "Password": "",
            "Phone": "",
            "UserPoleId": 1,
            "UserRightId": 1
        }

        $.ajax({
            url: 'https://localhost:5001/api/user',
            type: "POST",
            data: JSON.stringify(user),
            contentType: 'application/json; charset=utf-8'
        }).done((response) => {
            var users = JSON.parse(response);
            users.forEach((u) => {
                if (u.IdAspNetUser == authUser.sub) {
                    this.changeRole(u.UserRight);
                }
            });
        });
    }

    async populateState() {
        const [isAuthenticated, authUser] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);

        if (authUser != null) {

            // Gestion de l'insertion d'un utilisateur dans notre table
            $.ajax({
                url: 'https://localhost:5001/api/user',
                type: "GET"
            }).done((response) => {
                var userExist = false;
                var users = JSON.parse(response);
                users.forEach((u) => {
                    if (u.IdAspNetUser == authUser.sub) {
                        userExist = true;
                        this.changeRole(u.UserRight);
                    }
                });
                if (!userExist) {
                    this.newUserConnected(authUser)
                }

            });

        }

        this.setState({
            isAuthenticated
        });
    }

    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    state = {
        dropDownOpen: ''
    }

    toggle = () => {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen,
        })
    }

    gestionMenu() {
        if ((this.state.role != null && this.state.role == 'ADMIN')||true) {
            return (
                <NavDropdown title={i18n.t('navbar:vehicles')} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#/vehicles">{i18n.t('navbar:vehicles')}</NavDropdown.Item>
                    <NavDropdown.Item href="#carmodels">{i18n.t('navbar:carmodels')}</NavDropdown.Item>
                    <NavDropdown.Item href="#/brands">{i18n.t('navbar:brands')}</NavDropdown.Item>
                    <NavDropdown.Item href="#/fuels">{i18n.t('navbar:fuels')}</NavDropdown.Item>
                </NavDropdown>
                //<NavItem><NavLink tag={Link} className="text-dark" to="/vehicles">{i18n.t('navbar:vehicles')}</NavLink></NavItem>
                //<NavItem><NavLink tag={Link} className="text-dark" to="/carmodels">{i18n.t('navbar:carmodels')}</NavLink></NavItem>
                //<NavItem><NavLink tag={Link} className="text-dark" to="/brands">{i18n.t('navbar:brands')}</NavLink></NavItem>
                //<NavItem><NavLink tag={Link} className="text-dark" to="/fuels">{i18n.t('navbar:fuels')}</NavLink></NavItem>
            );
        } else {
            return null;
        }
    }

    render() {

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-info border-bottom box-shadow mb-3" light>
                    <Container>

                        <NavbarBrand>
                            <Link to="/">
                                <img src={require('./img/logo_wheelo_small.png')} height="30" width="auto" />
                            </Link>
                        </NavbarBrand>

                       

                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                {
                                    (this.state.role != null && this.state.role == 'ADMIN') ? <NavItem><NavLink tag={Link} className="text-dark" to="/pole">{i18n.t('navbar:poleData')}</NavLink></NavItem> : null
                                }
                                {
                                    (this.state.role != null && this.state.role == 'ADMIN') ? <NavItem><NavLink tag={Link} className="text-dark" to="/rentrequests">{i18n.t('navbar:rent_requests')}</NavLink></NavItem> : null
                                }
                                {(this.state.role != null && this.state.role == 'ADMIN') ? <NavItem>
                                    <NavDropdown className="text-dark" title={i18n.t('navbar:vehicles')} id="collasible-nav-dropdown">
                                        <NavDropdown.Item className="text-dark" href="/vehicles">{i18n.t('navbar:vehicles')}</NavDropdown.Item>
                                        <NavDropdown.Item className="text-dark" href="carmodels">{i18n.t('navbar:carmodels')}</NavDropdown.Item>
                                        <NavDropdown.Item className="text-dark" href="/brands">{i18n.t('navbar:brands')}</NavDropdown.Item>
                                        <NavDropdown.Item className="text-dark" href="/fuels">{i18n.t('navbar:fuels')}</NavDropdown.Item>
                                    </NavDropdown>
                                </NavItem> : null}
                                {
                                    (this.state.role != null && this.state.role == 'ADMIN') ? <NavItem></NavItem> : null
                                }
                                {
                                    (this.state.role != null && this.state.role == 'USER') ? <NavItem><NavLink tag={Link} className="text-dark" to="/rents">{i18n.t('navbar:rents')}</NavLink></NavItem> : null
                                }
                                <LoginMenu>
                                </LoginMenu>
                                <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle} >
                                    <DropdownToggle nav caret className="dropdown-toggle">
                                        <img src={require(`../components/img/icons/${i18n.language.substring(0,2)}.png`)} alt={i18n.language} />
                                    </DropdownToggle>
                                    <DropdownMenu className="language-dropdown">
                                        <DropdownItem onClick={() => i18n.changeLanguage('fr')} dropdownvalue="FR">FR</DropdownItem>
                                        <DropdownItem onClick={() => i18n.changeLanguage('en')} dropdownvalue="EN">EN</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </ul>
                        </Collapse>
                    </Container>

                </Navbar>
            </header>
        );
    }

}
