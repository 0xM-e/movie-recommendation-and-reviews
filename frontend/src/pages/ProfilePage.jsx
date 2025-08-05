import React from 'react';
import "../styles/ProfilePage.css";

const mockUser = {
  name: 'Kullanici Adı',
  email: 'kullanici@email.com',
  joined: '2024-01-01',
    avatar: 'https://i.redd.it/ins05wj3pmef1.jpeg',
  favoriteMovies: [
    { id: 1, title: 'Inception' },
    { id: 2, title: 'Interstellar' }
  ]
};

/*trash()
{
  <div>
    <img
          src={mockUser.avatar}
          alt="Avatar"
          style={{            
            width: 256,
            height: 256,
            borderRadius: '50%',
            marginBottom: 16,
            objectFit: 'cover',
          }}/>
      <div>
        <strong>Ad:</strong> {mockUser.name}
      </div>
      <div>
        <strong>Email:</strong> {mockUser.email}
      </div>
      <div>
        <strong>Kayıt Tarihi:</strong> {mockUser.joined}
      </div>
      <div style={{ marginTop: 24 }}>
        <h3>Favori Filmler</h3>
        <ul>
          {mockUser.favoriteMovies.map(movie =>
          (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
  </div> 
}*/

function ProfilePage() {
  return (
    <div className="profile-page">
    </div>
  );
}

export default ProfilePage;