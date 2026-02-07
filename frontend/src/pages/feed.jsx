import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this

const Feed = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Add this

  useEffect(() => {
    // URL MUST MATCH THE ROUTE IN userRoutes.js
    fetch("http://localhost:3000/user/getAllUsers") 
      .then(res => res.json())
      .then(data => {
        // Log it to the console so you can see if data arrived
        console.log("Users fetched:", data);
        setUsers(data);
      })
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl mb-4">Find Your Learning Partner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length === 0 ? (
          <p>No users found yet.</p>
        ) : (
          users.map((u) => (
            <div key={u._id} className="border p-4 rounded shadow-sm bg-white">
              <h3 className="font-bold">{u.name}</h3>
              <p className="text-sm">
                Expert in: {u.skillsHave && u.skillsHave.length > 0 
                  ? u.skillsHave.join(", ") 
                  : "No skills listed"}
              </p>
              
              <button 
                onClick={() => navigate(`/user/`)} 
                className="mt-2 text-blue-600 underline"
              >
                View Full Profile
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;