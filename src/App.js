import {BrowserRouter,Routes, Route} from "react-router-dom";

import Home from './pages/Home/Home'
import NotePage from "./pages/NotePage/NotePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path={'/'} element={<Home/>}/>
                <Route path={'/:id'} element={<NotePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
