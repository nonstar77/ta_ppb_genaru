import React from 'react';
import image from "./profileimage.png";

const Account = () => {
const userName = 'Genaru Badra Kurniawan';
const nim = '2112021130059';
const profileImage = image;

return (
    <div className="profile-page">
    <div className="profile-container">
        <img src={profileImage} alt="Profile" className="profile-picture" />
    </div>
    <p className="user-name">{userName}</p>
    <p className="nim">{nim}</p>
    </div>
);
};

const styles = `
.profile-page {
    text-align: center;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
}

.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-picture {
    width: 250px;
    border-radius: 50%;
}

.user-name {
    font-weight: bold;
    font-size: 1.5em;
    margin-top: 10px;
    font-family: 'Poppins', sans-serif;
}

.nim {
    font-size: 1.5em; /* Adjust the font size as needed */
    margin-top: 10px; /* Add spacing between profile picture and username */
    font-family: 'Poppins', sans-serif; /* Replace with your desired font family */
}
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Account;
