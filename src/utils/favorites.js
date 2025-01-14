export const addFavorite = async (favorite) => {
  const response = await fetch('http://localhost:5000/api/favorites/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(favorite),
  });
  return response.json();
};

export const getFavorites = async (userId) => {
  const response = await fetch(`http://localhost:5000/api/favorites/${userId}`);
  return response.json();
};

export const removeFavorite = async (id) => {
  const response = await fetch(`http://localhost:5000/api/favorites/remove/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}; 