import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import uns_image from './Unsplash_Logo.png';

const Container = styled.div`
    text-align: center;
    font-size: 2xl;
    margin: 1.5rem 1rem;
    padding: 0 1rem;
`;


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1rem;
`;

const ImageContainer = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    transition: transform 0.3s;
    cursor: pointer;
    z-index: 1;

    &:hover {
        transform: scale(0.98);
        z-index: 2;
    }

    &:hover .overlay {
        opacity: 0.6;
    }

    &:active {
        transform: scale(1.05);
        transition: 0.3s;
    }
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 3;
`;

const Image = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
`;

const Category = () => {
    const categories = [
        { name: "animal", image: "https://i.natgeofe.com/k/63b1a8a7-0081-493e-8b53-81d01261ab5d/red-panda-full-body_4x3.jpg" },
        { name: "architecture", image: "https://i.guim.co.uk/img/media/36b204799f4fc18495804f2c21510bb4a4672609/0_142_5576_3344/master/5576.jpg?width=465&dpr=1&s=none" },
        { name: "city", image: "https://plus.unsplash.com/premium_photo-1680284197360-f1c214c96b29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8&w=1000&q=80" },
        { name: "food", image: "https://www.tcmcapital.co.uk/wp-content/uploads/2021/09/Food-Drink-A-1024x614.jpg" },
        { name: "nature", image: "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2022/01/good-nature-homepage-hero_2-1280x640.jpg" },
        { name: "space", image: "https://cdn.hswstatic.com/gif/space-smell-2.jpg" },
        { name: "sports", image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Youth-soccer-indiana.jpg" },
        { name: "street photography", image: "https://www.blibli.com/friends-backend/wp-content/uploads/2017/10/istockphoto-1146224410-170667a.jpeg" },
        { name: "travel", image: "https://images.tokopedia.net/blog-tokopedia-com/uploads/2020/01/traveling.jpg" },
    ];


    return (
        <Container>
            <h1 className='text-center text-2xl mb-10 mt-7'>Image Categories</h1>
            <Grid>
                {categories.map((category, index) => (
                    <Link key={index} to={`/categories/${category.name}`}>
                        <ImageContainer>
                            <Image src={category.image} alt={category.name} />
                            <Overlay className="overlay">{category.name}</Overlay>
                        </ImageContainer>
                    </Link>
                ))}
            </Grid>
            <div className='mt-4'>
            <Link to="/search">
                <ImageContainer>
                    <Image src={uns_image} alt="more images" />
                    <Overlay className="overlay">more images?</Overlay>
                </ImageContainer>
            </Link>
            </div>
        </Container>
    );

}

export default Category;
