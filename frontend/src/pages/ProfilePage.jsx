import React from "react";
import "../styles/ProfilePage.css";

const user = {
    name: "Akın Bozburun",
    username: "aknbznbrn",
    bio: "Film tutkunu ve amineci. Sinema dünyasını keşfetmeyi seviyorum.",
    joinDate: "Ocak 2025",
    avatar: "https://wallpapers.com/images/hd/meme-profile-picture-2rhxt0ddudotto63.jpg",
    stats: {
      reviews: 34,
      followers: 120,
      following: 75
    }
  };

function ProfilePage() {  

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img className="profile-photo" src={user.avatar} alt="Avatar"/>
        <h2>{user.name}</h2>
        <p className="user">@{user.username}</p>
        <p>{user.bio}</p>        
        <p>📅 Katıldı: {user.joinDate}</p>
        <div className="stats">
          <div>
            <strong>{user.stats.reviews}</strong>
            <p>İnceleme</p>
          </div>
          <div>
            <strong>{user.stats.followers}</strong>
            <p>Takipçi</p>
          </div>
          <div>
            <strong>{user.stats.following}</strong>
            <p>Takip</p>
          </div>
        </div>
      </div>

      {/* Sağ kısım - Kullanıcının içerikleri */}
      <div className="content">
        <h2>Son İncelemeler</h2>        
        <div className="profile-review-card" >
          <img src="https://image.tmdb.org/t/p/w500/7tvAnzZj9e9AjdoHaN9jshm2Cjw.jpg" alt="movie poster" className="movie-poster"/>
          <div className="profile-review-text">
            <h4>🎬 Interstellar</h4>
            <p>Evrenin büyüklüğünü hissettiren bir başyapıt.</p>
          </div>
        </div>
        <div className="profile-review-card">
          <img src="https://image.tmdb.org/t/p/w500/7tvAnzZj9e9AjdoHaN9jshm2Cjw.jpg" alt="movie poster" className="movie-poster"/>
          <div className="profile-review-text">
            <h4>🎬 Interstellar</h4>
            <p>Evrenin büyüklüğünü hissettiren bir başyapıt.</p>
          </div>
        </div>
        <div className="profile-review-card">
          <img src="https://image.tmdb.org/t/p/w500/7tvAnzZj9e9AjdoHaN9jshm2Cjw.jpg" alt="movie poster" className="movie-poster"/>
          <div className="profile-review-text">
            <h4>🎬 Interstellar</h4>
            <p>Evrenin büyüklüğünü hissettiren bir başyapıt.</p>
          </div>
        </div>
        <div className="profile-review-card">
          <img src="https://image.tmdb.org/t/p/w500/7tvAnzZj9e9AjdoHaN9jshm2Cjw.jpg" alt="movie poster" className="movie-poster"/>
          <div className="profile-review-text">
            <h4>🎬 Interstellar</h4>
            <p>Evrenin büyüklüğünü hissettiren bir başyapıt.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
