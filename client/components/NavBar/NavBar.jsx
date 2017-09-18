import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <div className='EddsData__NavBar navbar navbar-default navbar-fixed-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <Link to='../' className='navbar-brand'>EDDS Data</Link>
                        <button className='navbar-toggle' type='button' data-toggle='collapse' data-target='#navbar-main'>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                    </div>
                    <div className='navbar-collapse collapse' id='navbar-main'>
                        <ul className='nav navbar-nav'>
                            <li>
                                <Link to='/notes' className='NavBar__Notes_link'>Notes</Link>  
                            </li>
                            <li>
                                <Link to='/rivers' className='NavBar__Rivers_link'>Rivers</Link>
                            </li>
                            <li>
                                <Link to='/fires' className='NavBar__Fires_link'>Fires</Link>
                            </li>
                            <li className='dropdown'>
                                <a className='dropdown-toggle' data-toggle='dropdown' href='#' id='themes'>Реки <span className='caret'></span></a>
                                <ul className='dropdown-menu' aria-labelledby='themes'>
                                    <li>
                                        <Link to='/rivers/form' className='NavBar__Rivers_link'>Форма ввода</Link>
                                    </li>
                                    <li>
                                        <Link to='/rivers/archive' className='NavBar__Rivers_link'>Архив</Link>
                                    </li>
                                    <li>
                                        <a href='../cosmo/'>Графики</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href='../help/'>Help</a>
                            </li>
                            <li>
                                <a href='http://news.bootswatch.com'>Blog</a>
                            </li>
                            <li className='dropdown'>
                                <a className='dropdown-toggle' data-toggle='dropdown' href='#' id='download'>Flatly <span className='caret'></span></a>
                                <ul className='dropdown-menu' aria-labelledby='download'>
                                    <li><a href='http://jsfiddle.net/bootswatch/jmg3gykg/'>Open Sandbox</a></li>
                                    <li className='divider'></li>
                                    <li><a href='./bootstrap.min.css'>bootstrap.min.css</a></li>
                                </ul>
                            </li>
                        </ul>
                        
                        <ul className='nav navbar-nav navbar-right'>
                            <li><a href='http://builtwithbootstrap.com/' target='_blank'>Built With Bootstrap</a></li>
                            <li><a href='https://wrapbootstrap.com/?ref=bsw' target='_blank'>WrapBootstrap</a></li>
                        </ul>
                        
                    </div>
                </div>
            </div>
        );
    }
} //NavBar

export default NavBar;
