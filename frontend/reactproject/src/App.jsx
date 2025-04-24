import "./App.css";
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Languages } from "./pages/languages";
import { Details } from "./pages/details";
import { Crud } from "./pages/crud";
import { Layout } from "./Layout";

function App() {
    return(
        <Router>
            <Routes>
                <Route element = {<Layout/>}>
                    <Route path = '/' element = {<Languages/>}/>
                    <Route path = '/details' element = {<Details/>}/>
                    <Route path = '/crud' element = {<Crud/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App;