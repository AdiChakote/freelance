import React, { useEffect, useRef, useState } from "react";
import "./Gigs.css";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();

  // Function to fetch gigs safely
  const fetchGigs = () => {
    const min = minRef.current?.value || 0;
    const max = maxRef.current?.value || 99999;
    const query = search ? `${search}&` : "?";
    return newRequest
      .get(`/gigs${query}min=${min}&max=${max}&sort=${sort}`)
      .then((res) => res.data);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", sort],
    queryFn: fetchGigs,
    enabled: false, // Don't run automatically
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr &gt; Graphics & Design &gt;</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input
              ref={minRef}
              type="number"
              placeholder="min"
              defaultValue={0}
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="max"
              defaultValue={99999}
            />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="/img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            <p>Loading gigs...</p>
          ) : error ? (
            <p>Something went wrong while fetching gigs!</p>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          ) : (
            <p>No gigs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
