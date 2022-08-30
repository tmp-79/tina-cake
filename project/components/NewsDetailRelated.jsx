import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { text18, text30 } from "../../shared/utils/mixin-styled";

const NewsDetailRelatedStyles = styled.div`
  padding: 24px;
  height: auto;
  width: 100%;
  background-color: #fff;
  border-radius: 16px;
  .news-related-title {
    ${text30}
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${(props) => props.theme.primaryColor};
  }
  .news-related-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .news-related-link {
    padding: 16px;
    ${text18}
    display: block;
    transition: linear 0.1s;
    font-weight: 600;
    &:hover {
      color: ${(props) => props.theme.primaryColor};
      background-color: #f6fcfa;
      border-radius: 100rem;
    }
    &.active {
      color: ${(props) => props.theme.primaryColor};
      background-color: #f6fcfa;
      border-radius: 100rem;
    }
  }

  /* Responsive */
  /* Mobie: width < 740px */
  @media only screen and (max-width: 739px) {
    width: auto;
  }
`;

const NewsDetailRelated = ({ data, ...props }) => {
  return (
    <NewsDetailRelatedStyles {...props}>
      <h3 className="news-related-title">Bài viết liên quan</h3>
      <ul className="news-related-list">
        {data.length > 0 &&
          data.map((item, index) => (
            <>
              {index < 5 && (
                <li key={item.id} className={`news-related-item`}>
                  <Link href={item.link}>
                    <a
                      className={`news-related-link  ${
                        item.active === true ? "active" : ""
                      }`}
                    >
                      {item.title}
                    </a>
                  </Link>
                </li>
              )}
            </>
          ))}
      </ul>
    </NewsDetailRelatedStyles>
  );
};

export default NewsDetailRelated;