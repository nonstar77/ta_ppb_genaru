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
            <p>S-1 Computer Engineering</p>
            <p>Diponegoro University</p>

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
            
            <p className='mt-4'>This app was created for my final assignment in mobile device programming class.</p>
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
        transition:0.3s;
    }

    .social-icons a {
        margin: 0 10px;
        color: #000;
    }

    .social-icons a:hover {
        color: #007bff;
        transform: scale(1.05);
        transition: 0.3s;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Account;
