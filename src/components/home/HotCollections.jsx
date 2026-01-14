import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "../UI/Carousel.jsx";
import Skeleton from "../UI/Skeleton.jsx";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data || []);
  }

  function renderHotCollections() {
    return hotCollections.map((nft) => (
      <div key={nft.id} className="px-2">
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to="/item-details">
              <img src={nft.nftImage} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img className="lazy pp-coll" src={nft.authorImage} alt="" />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{nft.title}</h4>
            </Link>
            <span>ERC-{nft.code}</span>
          </div>
        </div>
      </div>
    ));
  }

  function renderSkeletonSlides() {
    return new Array(4).fill(0).map((_, index) => (
      <div className="px-2" key={index}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <Skeleton width="100%" height="200px" />
          </div>
          <div className="nft_coll_pp">
            <Skeleton width="60px" height="60px" borderRadius="50%" />
          </div>
          <div className="nft_coll_info">
            <div>
              <Skeleton width="100px" height="20px" />
            </div>
            <div>
              <Skeleton width="70px" height="20px" />
            </div>
          </div>
        </div>
      </div>
    ));
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {hotCollections.length > 0 ? (
            <Carousel collection={renderHotCollections()} />
          ) : (
            <Carousel collection={renderSkeletonSlides()} />
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
