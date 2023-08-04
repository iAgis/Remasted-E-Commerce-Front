import React from "react";
import { Link } from "react-router-dom"

const Success = () => {
  return (
    <div
      className="container my-5 pt-5 d-flex align-items-center justify-content-center flex-column"
      style={{ height: `70vh` }}
    >
      <img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3f6c4afc-7680-42d7-9859-ce7d521c2f37/dcei9fh-e06b7871-ec40-4b6f-a30e-7ba56b0ca82d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNmNmM0YWZjLTc2ODAtNDJkNy05ODU5LWNlN2Q1MjFjMmYzN1wvZGNlaTlmaC1lMDZiNzg3MS1lYzQwLTRiNmYtYTMwZS03YmE1NmIwY2E4MmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.m0pGw0Y-8PZLUP-MIIbkKwSBfXX6F0onvlpA3qbruVs"
        alt="Loneless"
      />
      <span className="titles-commerce fs-4 mt-3 text-center">
        
      </span>
      <Link to="/" className="btn btn-dark rounded-0 mt-3 titles-commerce px-3">
        Buy more cars
      </Link>
    </div>
  );
};

export default Success;
