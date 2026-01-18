import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Carousel from "../UI/Carousel";
import CountdownDisplay from "../UI/CountdownDisplay";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);

  async function fetchNewItems() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setNewItems(data || []);
  }

  function renderNewItems() {
    return newItems.map((nft) => (
      <div className="px-2" key={nft.id}>
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to="/author"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
            >
              <img className="lazy" src={nft.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          {nft.expiryDate && (
            <div className="de_countdown">
              <CountdownDisplay expiryDate={nft.expiryDate} />
            </div>
          )}
          <div className="nft__item_wrap">

            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
            <Link to={`/item-details/${nft.nftId}`}>
              <img
                src={nft.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to={`/item-details/${nft.nftId}`}>
              <h4>{nft.title}</h4>
            </Link>
            <div className="nft__item_price">{nft.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{nft.likes}</span>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  function renderSkeletonNewItems() {
    return new Array(4).fill(0).map((_, index) => (
      <div className="px-2" key={index}>
        <div className="nft__item">
          <div className="author_list_pp">
            <Skeleton width="50px" height="50px" borderRadius="50%" />
          </div>
          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
            <Skeleton width="280px" height="200px" />
          </div>
          <div className="nft__item_info">
            <Skeleton width="120px" height="20px" />
            <div className="nft__item_price">
              <Skeleton width="80px" height="20px" />
            </div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>
                <Skeleton width="15px" height="15px" />
              </span>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  useEffect(() => {
    fetchNewItems()
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {newItems.length > 0 ? (
            <Carousel collection={renderNewItems()} />
          ) : (
            <Carousel collection={renderSkeletonNewItems()} />
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
