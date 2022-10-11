import React from "react";
import styled from "styled-components";

const LoadingTemplate1Styles = styled.div`
  @keyframes follow-the-leader {
    0% {
      -webkit-transform: rotate(0deg) translateY(-200%);
      transform: rotate(0deg) translateY(-200%);
    }

    60%,
    100% {
      -webkit-transform: rotate(360deg) translateY(-200%);
      transform: rotate(360deg) translateY(-200%);
    }
  }

  .follow-the-leader {
    height: 14px;
    position: relative;
    margin: 30px auto;
    width: 14px;
  }

  .follow-the-leader div {
    -webkit-animation: follow-the-leader 1.875s infinite backwards;
    animation: follow-the-leader 1.875s infinite backwards;
    background-color: #ffffff;
    border-radius: 100%;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .follow-the-leader div:nth-child(1) {
    -webkit-animation-delay: 0.15s;
    animation-delay: 0.15s;
    background-color: rgba(255, 255, 255, 0.9);
  }

  .follow-the-leader div:nth-child(2) {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .follow-the-leader div:nth-child(3) {
    -webkit-animation-delay: 0.45s;
    animation-delay: 0.45s;
    background-color: rgba(255, 255, 255, 0.7);
  }

  .follow-the-leader div:nth-child(4) {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
    background-color: rgba(255, 255, 255, 0.6);
  }

  .follow-the-leader div:nth-child(5) {
    -webkit-animation-delay: 0.75s;
    animation-delay: 0.75s;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const LoadingTemplate1 = () => {
  return (
    <LoadingTemplate1Styles>
      <div className="follow-the-leader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingTemplate1Styles>
  );
};

export default LoadingTemplate1;
