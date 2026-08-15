import React from "react";

import hero_image1 from "../assets/hero_image1.png";
import hero_image2 from "../assets/hero_image2.png";
import button_arrow from "../assets/button_arrow.png";
import collections_image2 from "../assets/collections_image2.png";
import collections_image1 from "../assets/collections_image1.png";
import hero2_image1 from "../assets/hero2_image1.png";
import hero2_image2 from "../assets/hero2_image2.png";
import hero2_image3 from "../assets/hero2_image3.png";
import "../index.css";
import products from "../pages/produts"


function Homepage() {
    return ( 
        <div className="homepage_body">
         <div className="hero_section">
            <div className="hero_text">
               <input type="text" placeholder="Search for products..." />
               <h1>NEW<br></br>COLLECTIONS</h1>
               <p>Summer<br></br>2026</p>
               <a href="products" className="hero-button">Shop Now<span className="hero-arrow" aria-hidden="true"><img src={button_arrow} alt="Arrow" /></span></a>
            </div>
            <div className="hero_images">
                <img src={hero_image1} alt="Hero Image 1" />
                <img src={hero_image2} alt="Hero Image 2" />
            </div>
         </div>

         <div className="collections">
            <div className="collection_text">
                <h1>XIV<br></br>COLLECTIONS</h1>
                <h2>23-24</h2>
            </div>
            <hr className="collection-divider"/>
            <div className="collection_cards">
                <div className="collection_card">
                    <img src={collections_image1} alt="Collection 1" />
                    <p>Cotton T-Shirt</p>   
                    <h3>Basic Heavy Weight T-shirt</h3>
                    <p>$ 99</p>
                </div>
                <div className="collection_card">
                    <img src={hero_image1} alt="Collection 1" />
                    <p>Cotton T-Shirt</p>   
                    <h3>Basic Heavy Weight T-shirt</h3>
                    <p>$ 99</p>
                </div>
                <div className="collection_card">
                    <img src={collections_image2} alt="Collection 2" />
                    <p>Cotton Jeans</p>
                    <h3>Soft Wash straight Fit Jeans</h3>
                    <p>$ 199</p>
                </div>
            </div>
         </div>

         <div className="hero2">
            <div className="hero2_text">
                <h1>OUR APPROACH TO FASHION DESIGN</h1>
                <p>at elegant vogue , we blend creativity with craftsmanship to create<br></br>
                    fashion that transcends trends and stands the test of time each<br></br> 
                    design is meticulously crafted, ensuring the highest quality<br></br>
                     exqulsite finish</p>
            </div>
            <div className="hero2_images">
                <div className="hero2_image_card hero2_image_left">
                    <img src={hero2_image1} alt="Hero Image 1" />
                </div>
                <div className="hero2_image_card hero2_image_center">
                    <img src={hero2_image2} alt="Hero Image 2" />
                </div>
                <div className="hero2_image_card hero2_image_right">
                    <img src={hero2_image3} alt="Hero Image 3" />
                </div>
            </div>
         </div>




         </div>

         
         
        )
}

export default Homepage;