import React, { useEffect } from "react";
import "./StarryBackground.css";

const StarryBackground = () => {
  useEffect(() => {
    const createStars = () => {
      const container = document.getElementById("star-container");
      for (let i = 0; i < 300; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        container.appendChild(star);
      }
    };

    createStars();
  }, []);

  return (
    <div
      id="star-container"
      className="fixed w-full h-[100vh]"
      style={{ zIndex: 0 }}
    ></div>
  );
};

export default StarryBackground;
