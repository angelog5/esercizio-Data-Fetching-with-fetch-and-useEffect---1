import { useState, useEffect } from "react";

const GithubUser = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {userData && (
        <div>
          <img
            src={userData.avatar_url}
            alt={`${userData.login} avatar`}
            width="100"
          />
          <h1>{userData.name}</h1>
          <p>{userData.login}</p>
        </div>
      )}
    </div>
  );
};

export default GithubUser;
