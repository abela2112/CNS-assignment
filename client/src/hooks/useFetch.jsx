import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../userContextProvider";
// Pass URL
const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [redirectWithGoogle, setRedirectWithGoogle] = useState(false)
    const { setUser } = useContext(UserContext)

    const handleGoogle = async (response) => {
        setLoading(true);
        try {

            const { data } = await axios.post(url, {
                credential: response.credential,
            })
            if (data) {

                setUser(data.data)
                setLoading(false);

                // window.location.reload();
                setRedirectWithGoogle(true);
            } else {

                throw new Error(data?.message || data);
            }

        } catch (error) {
            setError(error);
        }


    };
    return { loading, error, handleGoogle, redirectWithGoogle, setError };
};

export default useFetch;
