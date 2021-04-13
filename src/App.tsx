import React from 'react'
import './App.css';
import HomePage from "./Components/HomePage";

const App = () => {
    return (
        <div className="App">
            <HomePage/>
            <section>
                main body
            </section>
            <footer className="footer">
                تمامی حقوق برای توسعه دهندگان محفوظ است
            </footer>
        </div>
    );
}

export default App;
