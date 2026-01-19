import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import UserImagePlaceholder from "../UI/UserImagePlaceholder";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  async function fetchTopSellers() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
    setTopSellers(data || []);
  }

  function renderTopSellers() {
    return topSellers.map((seller) => (
      <li key={seller.id}>
        <div className="author_list_pp">
          <Link to={`/author/${seller.authorId}`}>
            {seller.authorImage ? (
              <img
                className="lazy pp-author"
                src={seller.authorImage}
                alt=""
              />
            ) : (
              <UserImagePlaceholder authorName={seller.authorName} />
            )}
            <i className="fa fa-check"></i>
          </Link>
        </div>
        <div className="author_list_info">
          <Link to={`/author/${seller.authorId}`}>
            {seller.authorName}
          </Link>
          <span>{seller.price} ETH</span>
        </div>
      </li>
    ))
  }

  function renderSkeletonTopSellers() {
    return new Array(12).fill(0).map((_, index) => (
      <li key={index}>
        <div className="author_list_pp">
          <Skeleton width="50px" height="50px" borderRadius="50%" />
        </div>
        <div className="author_list_info">
          <Skeleton width="80%" height="20px" />
          <span>
            <Skeleton width="50px" height="20px" />
          </span>
        </div>
      </li>
    ))
  }

  useEffect(() => {
    fetchTopSellers();
  },[])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers.length > 0 ? (
                renderTopSellers()
              ) : (
                renderSkeletonTopSellers()
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
