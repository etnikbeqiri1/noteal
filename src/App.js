import {db, auth} from './firebase';
import {useEffect, useRef, useState} from "react";
import {BrowserRouter,Routes, Route} from "react-router-dom";

import Home from './pages/Home'
import NotePage from "./pages/NotePage/NotePage";

function App() {


    const [path, setPath] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    // let ref = useRef();
    // async function saveNote() {
    //     const data = {
    //         name: 'Los Angeles',
    //         state: 'CA',
    //         country: 'USA'
    //     };
    //     const res = await db.collection('notes').doc('LA').set(data);
    //     console.log(res)
    //
    // }

    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     if (true) {
    //         navigate.go('/home');
    //     }
    // });
    //
    // useEffect(() => {
    //     let string = makeStringIdentifier(5);
    //     console.log(string);
    //     // navigate(string);
    //     setPath(string);
    //     setShouldRedirect(true);
    // }, []);




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
