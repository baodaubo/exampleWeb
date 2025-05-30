import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // To prevent setting state on unmounted components

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                if (isMounted) setData(result);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup function to prevent memory leaks
        };
    }, [url]); // Re-fetch if `url` or `options` change

    return { data, loading, error };
};

export default useFetch;
