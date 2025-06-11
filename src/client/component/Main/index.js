
import React from "react";
// import useFetch from "../../customHook/useFetch";
// import useFetch from "@client/customHook/useFetch";
// const fetchUsers = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await res.json();
//     return data;
// }

// async function Users() {
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const res = await fetch("https://jsonplaceholder.typicode.com/users");
//                 const data = await res.json();
//                 setUsers(data);
//             } catch (error) {
//                 console.error("Fetch error:", error);
//             }
//         }
//         fetchData();
//     }, []);
//     return (<ul>
//         {users.map((user) => (
//             <li key={user.id}>{user.name} - {user.email}</li>
//         ))}
//     </ul>)
// }
// console.log("Require path:", require.resolve('@customHook/useFetch'));

const Main = () => {
    // const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");

    // if (loading) return <p>⏳ Loading...</p>;

    // if (error) return <p>❌ Error: {error}</p>;

    // const handleReset = async () => {
    //     try {
    //         const res = await fetch("https://jsonplaceholder.typicode.com/users");
    //         const data = await res.json();
    //         setUsersData(data);
    //     } catch (error) {
    //         console.error("Error fetching posts:", error);
    //     }
    // }
    return (
        <div>
            <p>Main Page</p>
            <p>Hello World</p>
            {/* <button onClick={handleReset}>Reset</button> */}
            {/* {data.map((user) => (
                <li key={user.id}>{user.name} - {user.email}</li>
            ))} */}
        </div>
    )
}

export default Main;