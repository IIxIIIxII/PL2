import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import "../styles/header.css";

const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ui.theme);

    React.useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return(
        <header className="header"> 
            <div className="header-inner container">
                <div className="logo">Пони</div>

                <nav className="nav">
                    <a href="/">Главная</a>
                    <a href="/ponies">Пони</a>
                    <a href="#">Контакты</a>
                </nav>

                <button
                className="theme-btn"
                onClick={ () => dispatch(toggleTheme()) } 
                >
                    {theme === 'light' ? '☀️' : '🌙'}
                </button>

            </div>
        </header>
    )
}

export default Header