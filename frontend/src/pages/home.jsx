import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Load logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(storedUser);
    setCurrentUser(parsed);
  }, [navigate]);

  // 2️⃣ Fetch & match users
  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/getAllUsers");
        const data = await res.json();

        // Match: my skillsWant == their skillsHave
        const filtered = data.filter(otherUser =>
          otherUser._id !== currentUser._id &&
          otherUser.skillsHave?.some(skill =>
            currentUser.skillsWant?.includes(skill)
          )
        );

        setMatchedUsers(filtered);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  // Loading state
  if (loading) return <p className="text-center mt-10">Finding partners...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        People Who Can Teach You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchedUsers.length === 0 ? (
          <p>No matching partners found yet.</p>
        ) : (
          matchedUsers.map((u) => (
            <div
              key={u._id}
              className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg">{u.name}</h3>

              <p className="text-sm text-gray-600">
                <strong>Can teach:</strong> {u.skillsHave?.join(", ")}
              </p>

              <button
                onClick={() => navigate(`/user/${u._id}`)}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded"
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

export default Home;
