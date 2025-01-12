import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingSkeleton from "../../../../shared/hooks/loading-skeletion/LoadingSkeleton";
import NewsItemLoading from "../../../components/LoadingSkeletonCpn/NewsItemLoading";
import NewsItem from "../../../components/NewsItem";
import AppHeaderTitle from "../../../controls/app-header-title/AppHeaderTitle";
import { db } from "../../../firebase/firebase-config";
import EmtyLayout from "../../emtyLayout/EmtyLayout";

const NewsHotLayoutStyles = styled.section`
  .emty-data {
    width: 100%;
  }
  .news-layout {
    margin-top: 40px;
    display: flex;
    gap: 40px;
  }
  .news-main {
    width: 50%;
    background: #fff;
    border-radius: 16px;
  }
  .new-list {
    width: 50%;
    gap: 20px;
    display: flex;
    flex-direction: column;

    .news-item {
      flex-direction: row;
      .news-image {
        width: 284px;
        max-height: 250px;
        flex-shrink: 0;
      }
    }
  }

  .news-main-image {
    height: 450px;
  }

  .news-list-loading {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  .new-item-loading {
  }

  /* Resonsive */

  /* Mobile & tablet: width <1024px */
  @media only screen and (max-width: 1023px) {
  }

  /* Tablet: width >= 740px and width < 1024px */
  @media only screen and (min-width: 740px) and (max-width: 1023px) {
    .news-layout {
      gap: 20px;
    }
    .news-main-image {
      height: 300px;
    }
    .new-list {
      .news-image {
        width: 150px !important;
        height: 160px !important;
      }
    }
  }

  /* Mobie: width < 740px */
  @media only screen and (max-width: 739px) {
    .news-layout {
      flex-direction: column;
      gap: 20px;
    }
    .news-main {
      width: 100%;
    }
    .news-item-main {
      flex-direction: row;
      .news-image {
        height: 100%;
      }
    }
    .new-list {
      width: 100%;

      .news-item {
        gap: 12px;
        .news-image-link {
          width: 50%;
        }
        .news-image {
          width: 100%;
          height: 100%;
          flex-shrink: initial;
        }
      }
    }
    .news-main-image {
      width: 100%;
      height: 100% !important;
    }
    .news-list-loading {
      grid-template-columns: repeat(1, 1fr);
      .news-image-link {
        width: 100%;
      }
      .news-body {
        width: 100%;
      }
    }
  }
`;

const NewsHotLayout = ({ title }) => {
  const [posts, setPosts] = useState([]);
  const [postMain, setPostMain] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data Hot Post main
  useEffect(() => {
    async function FetchPostMain() {
      setLoading(true);
      try {
        const colRef = collection(db, "posts");
        const q = query(colRef, where("hot", "==", true), limit(1));
        onSnapshot(q, (snapshot) => {
          let result = [];
          snapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setPostMain(result);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    FetchPostMain();
  }, []);
  //  end Fetch hot post main

  // Fetch Data Hot Post
  useEffect(() => {
    async function FetchDataHotPost() {
      setLoading(true);
      try {
        const colRef = collection(db, "posts");
        const queries = query(colRef, where("hot", "==", true), limit(3));
        onSnapshot(queries, (snapshot) => {
          let result = [];
          snapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setPosts(result);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
      }
    }
    FetchDataHotPost();
  }, []);
  // end Fetch Data Hot Post

  return (
    <NewsHotLayoutStyles>
      <div className="container py-layout">
        <AppHeaderTitle
          title={title}
          link="/danh-sach-bai-viet"
        ></AppHeaderTitle>

        <div className="news-layout">
          {posts && !loading && (
            <>
              <div className="news-main">
                {postMain
                  .sort((a, b) =>
                    a.createAt.seconds < b.createAt.seconds ? 1 : -1
                  )
                  .map((item) => (
                    <NewsItem
                      key={item.id}
                      title={item.title}
                      slug={item.slug}
                      image={item.image}
                      category={item.categoryId}
                      desc={item.desc}
                      date={`${new Date(
                        item?.createAt?.seconds * 1000
                      ).toLocaleTimeString("vi-VI")} - ${new Date(
                        item?.createAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")}`}
                      content="✍️ Tháng 11 - tháng tri ân ngày Nhà giáo Việt Nam 20/11 - đây không chỉ là ngày để các bạn bày tỏ lòng biết ơn công lao dạy dỗ của thầy cô mà đây là dịp thầy trò được gần gũi, gắn kết với nhau hơn."
                      className="news-item-main"
                      classNameImage="news-main-image"
                    ></NewsItem>
                  ))}
              </div>
              <div className="new-list">
                {posts &&
                  posts
                    ?.sort((a, b) =>
                      a.createAt.seconds < b.createAt.seconds ? 1 : -1
                    )
                    .map((item) => (
                      <Fragment key={item.id}>
                        <NewsItem
                          key={item.id}
                          className="news-item"
                          classNameImage="home-new-image"
                          title={item.title}
                          slug={item.slug}
                          image={item.image}
                          desc={item.desc}
                          category={item.categoryId}
                          date={`${new Date(
                            item?.createAt?.seconds * 1000
                          ).toLocaleTimeString("vi-VI")} - ${new Date(
                            item?.createAt?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}`}
                        ></NewsItem>
                      </Fragment>
                    ))}
              </div>
            </>
          )}
        </div>
        {loading && (
          <div className="news-list-loading">
            <NewsItemLoading className="new-item-loading"></NewsItemLoading>
            <NewsItemLoading className="new-item-loading"></NewsItemLoading>
          </div>
        )}
        {posts.length === 0 && loading === false && (
          <>
            <EmtyLayout text="không tìm thấy bài viết"></EmtyLayout>
          </>
        )}
      </div>
    </NewsHotLayoutStyles>
  );
};

export default NewsHotLayout;
