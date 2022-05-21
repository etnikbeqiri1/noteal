import {Link, Redirect, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Home() {
    const navigate = useNavigate();

    const makeStringIdentifier = (length = 5) => {
        let result = '';
        let characters = 'abcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    useEffect(() => {
        navigate(`/${makeStringIdentifier(5)}`)
    }, [])

    return (
        <p>Loading</p>
    )
}