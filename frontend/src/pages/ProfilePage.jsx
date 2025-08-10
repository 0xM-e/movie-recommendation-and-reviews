import React from "react";
import "../styles/ProfilePage.css";

const user = {
    name: "Kerem Koç",
    username: "LvL100Amineci",
    bio: "Film tutkunu ve amineci. Sinema dünyasını keşfetmeyi seviyorum.",
    joinDate: "Ocak 2025",
    avatar: "https://avatars.githubusercontent.com/u/159952115?v=4",
    stats: {
      reviews: 34,
      followers: 120,
      following: 75
    }
};

const reviews = [{
      id: 1,
      movie: "Interstellar",
      poster: "https://image.tmdb.org/t/p/w500/7tvAnzZj9e9AjdoHaN9jshm2Cjw.jpg",
      review: "Evrenin büyüklüğünü hissettiren bir başyapıt."
  },
  {
      id: 2,
      movie: "Inception",
      poster: "https://image.tmdb.org/t/p/w500/sjMN7DRi4sGiledsmllEw5HJjPy.jpg",
      review: "Zihin bükücü bir deneyim, her izleyişte yeni bir şey keşfediyorum."
  },
  {
      id: 3,
      movie: "The Matrix",
      poster: "https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
      review: "Sanal gerçeklik ve felsefi derinlik mükemmel bir şekilde harmanlanmış."
  },
  {
      id: 4,
      movie: "Parasite",
      poster: "https://image.tmdb.org/t/p/w500/4YZpsylmjHbqeWzjKpUEF8gcLNW.jpg",
      review: "Toplumsal sınıf farklarını ustaca ele alan bir film."
  },
]

function ProfilePage() {
  return(
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
        {reviews.map(review => (
          <div className="profile-review-card" key={review.id}>
            <img className="movie-poster" src={review.poster} alt={review.movie} />
            <div className="profile-review-text">
              <h3>{review.movie}</h3>
              <p>{review.review}</p>
            </div>
            <div className="profile-review-rating">
              <h4>Rating</h4>
              <p>⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
