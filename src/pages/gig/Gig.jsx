import React from "react";
import "./Gig.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const {
    isLoading: userLoading,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${data?.userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!data?.userId,
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">
            FIVERR &gt; GRAPHICS & DESIGN &gt;
          </span>
          <h1>{data.title}</h1>

          {userLoading ? (
            "Loading user..."
          ) : userError ? (
            "Error loading user"
          ) : (
            <div className="user">
              <img
                className="pp"
                src={userData.img || "/img/noavatar.jpg"}
                alt=""
              />
              <span>{userData.username}</span>
            </div>
          )}

          <Slider {...sliderSettings}>
            {data.images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Gig ${index}`} />
              </div>
            ))}
          </Slider>

          <h2>About This Gig</h2>
          <p>{data.desc}</p>

          <div className="seller">
            <h2>About The Seller</h2>
            {userLoading ? (
              "Loading..."
            ) : (
              <div className="user">
                <img src={userData.img || "/img/noavatar.jpg"} alt="" />
                <div className="info">
                  <span>{userData.username}</span>
                  <button>Contact Me</button>
                </div>
              </div>
            )}
          </div>

          <Reviews gigId={id} />
        </div>

        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>₹{data.price}</h2>
          </div>
          <p>{data.shortDesc}</p>

          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>

          <div className="features">
            {data.features.map((feature, index) => (
              <div className="item" key={index}>
                <img src="/img/greencheck.png" alt="" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gig;
