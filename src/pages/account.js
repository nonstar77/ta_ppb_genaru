import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import image from './profileimage.png';

const Account = () => {
    const userName = 'Genaru Badra Kurniawan';
    const nim = '2112021130059';
    const profileImage = image;

    const instagramLink = 'https://www.instagram.com/ggnaru';
    const linkedinLink = 'https://www.linkedin.com/in/genaru-badra-kurniawan/';
    const githubLink = 'https://github.com/nonstar77';

    return (
        <div className="profile-page">
            <div className="profile-container">
                <img src={profileImage} alt="Profile" className="profile-picture" />
            </div>
            <p className="user-name">{userName}</p>
            <p className="nim">{nim}</p>
            <p>S-1 Teknik Komputer</p>
            <p>Universitas Diponegoro</p>

            <div className="social-icons">
                <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={30} />
                </a>
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={30} />
                </a>
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                    <FaGithub size={30} />
                </a>
            </div>
        </div>
    );
};

const styles = `
    .profile-page {
        text-align: center;
        padding: 10px;
        font-family: 'Poppins', sans-serif;
    }

    .profile-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .profile-picture {
        padding-top: 30px;
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
        font-size: 1.5em;
        font-family: 'Poppins', sans-serif;
    }
    
    .social-icons {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .social-icons a {
        margin: 0 10px;
        color: #000; /* Set your desired color */
    }

    .social-icons a:hover {
        color: #007bff; /* Set your desired hover color */
    }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Account;
