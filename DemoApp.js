import {useState,useEffect} from "react";
import axios from "axios";
function DemoApp()
{
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [data, setdata]=useState([]);
    //const [id, setid]=useState('');
    //const [avatar, setavtar]=useState('');
    const [firstname, setfirstname]=useState('');
    const [lastname, setlastname]=useState('');
    const [email, setemail]=useState('');
    const [newdata,setnewdata]=useState({});


    useEffect(() => {
       fetchData();
    }, [])
    const fetchData = async () => {
        try {
          const response = await axios.get('https://reqres.in/api/users');
          setUsers(response.data);
          setdata(response.data.data);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=2`);
            setUsers(response.data);
            setdata(response.data.data);
          } catch (error) {
            console.error('Error fetching todos:', error);
          }
      };
      console.log(users);
      console.log(data); 
      console.log(newdata);
    const addinfo = async () => {
        setnewdata({email:email,first_name:firstname,last_name:lastname})
        try {
          await axios.post('https://reqres.in/api/users',newdata
        //    {id:id,email:email,first_name:firstname,last_name:lastname,avatar:avatar}
           );
          fetchData();
        } catch (error) {
          console.error('Error while writing data:', error);
        }
    };
    function ValidateEmail() 
    {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        alert("Email is valid")
      }
      else{
        alert("Email is not valid")
      }
    }
      
    return(

        <>
        <div>
            <h1 align="center">Table</h1>
        </div>
        <div className="App">
          <h3>Users information</h3>
          <table border={1} align="center">
            <tr>
              <th>user id</th>
              <th>avtar</th>
              <th>Full name</th>
              <th>email</th>
              
            </tr>
            {(data).map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td><img src={user.avatar}></img></td>
                <td>{user.first_name}&nbsp;{user.last_name}</td>
                <td>{user.email}</td>
                
              </tr>
            ))}
          </table>
          <h3>Add New User</h3>
          Email:-<input type="text"
           value={email}
           onChange={(e) => setemail(e.target.value)}
          ></input>
          <button onClick={ValidateEmail}>Check Email Validation</button>
         <br></br>
           firstname:-<input type="text"
           value={firstname}
           onChange={(e) => setfirstname(e.target.value)}
          ></input>
           <br></br>
           latsname:-<input type="text"
           value={lastname}
           onChange={(e) => setlastname(e.target.value)}
          ></input>
           <br></br>
          
        <button onClick={addinfo}>Add New User</button>
    </div>
    </>
    )
}

export default DemoApp;