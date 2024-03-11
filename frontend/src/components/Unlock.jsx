import axios from "axios"
import { useEffect } from "react";
import { BACKEND_URL } from '../utils/config';
import { useNavigate } from "react-router-dom";

const Unlock = () => {
    const navigate = useNavigate();

    async function unlock() {
        const response = await axios.get(`${BACKEND_URL}/api/mentor/unlock`)
        console.log(response.data)
        alert(response.data.msg)
        navigate(`/my-student`)
    }

    useEffect(() => {
        unlock();
    }, [])

    return (
        <div>Unlock</div>
    )
}

export default Unlock