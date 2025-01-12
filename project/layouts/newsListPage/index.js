/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NewsList from "../../components/NewsList";
import HeadSeo from "../../components/SEO";
import AppHeading from "../../controls/app-heading/AppHeading";
import styled from "styled-components";
import AppSearchForm from "../../controls/app-search-form/AppSearchForm";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import AppButton from "../../controls/app-button/AppButton";
import { debounce } from "lodash";
import EmtyLayout from "../emtyLayout/EmtyLayout";
import NewsItemLoading from "../../components/LoadingSkeletonCpn/NewsItemLoading";

const NewsListPageStyles = styled.section`
  margin-top: 40px;
  .new-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }
  .btn-loadmore {
    margin-inline: auto;
    margin-top: 40px;
  }
  .news-list-loading {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
  .pagination-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 40px;
    .next {
      display: none;
    }
    .previous {
      display: none;
    }
    li {
      &.selected {
        background-color: ${(props) => props.theme.primaryColor};
        color: #ffff;
        border-radius: 100rem;
      }
      a {
        display: block;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100rem;
        cursor: pointer;
        transition: linear 0.2s;
        &:hover {
          background-color: rgba(82, 189, 148, 0.5);
          color: #fff;
        }
      }
    }
  }
  /* Mobie: width < 740px */
  @media only screen and (max-width: 739px) {
    .new-list-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 20px;
    }
    .pagination-wrap {
      flex-wrap: wrap;
      li {
        a {
          width: 30px !important;
          height: 30px !important;
        }
      }
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

  /* Tablet: width >= 740px and width < 1024px */
  @media only screen and (min-width: 740px) and (max-width: 1023px) {
    .news-list-loading {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const NewsListPage = () => {
  const [value, setValue] = useState("");
  const [activeInput, setActiveInput] = useState(false);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  const [loading, setLoading] = useState(true);

  const handleLoadmore = async () => {
    const nextRef = query(
      collection(db, "posts"),
      orderBy("createAt", "desc"),
      startAfter(lastDoc || 0),
      limit(8)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts([...posts, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  // Fetch Data Post
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const colRef = collection(db, "posts");
        const newRef = query(colRef, orderBy("createAt", "desc"), limit(8));
        const documentSnapshots = await getDocs(newRef);
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastDoc(lastVisible);

        onSnapshot(colRef, (snapshot) => {
          setTotal(snapshot.size);
        });

        onSnapshot(newRef, (snapshot) => {
          let result = [];
          snapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setPosts(result);
        });
        setLastDoc(lastVisible);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  // end Fetch Data Post

  // Search Filter News
  const dataFilter = (text) => {
    const data = posts?.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    if (text) {
      return data;
    } else {
      return null;
    }
  };
  // end Search Filter News

  // handle search filter input
  const handleFilterInput = debounce((e) => {
    setValue(e.target.value);
  }, 500);
  // end handle search filter input

  return (
    <>
      <HeadSeo title="Danh sách bài viết | Tina Cake" />
      <NewsListPageStyles className={`container py-layout `}>
        <div className="new-list-header">
          <AppHeading className="heading">Danh sách bài viết</AppHeading>
          <AppSearchForm
            className={`input-filter ${activeInput ? "active" : ""}`}
            onFocus={() => setActiveInput(true)}
            onBlur={() => setActiveInput(false)}
            onChange={handleFilterInput}
            placeholder="Tìm kiếm bài viết..."
          ></AppSearchForm>
        </div>
        <NewsList data={dataFilter(value) || posts}></NewsList>

        {posts.length === 0 && loading === false && (
          <>
            <EmtyLayout
              text="không tìm thấy bài viết"
            ></EmtyLayout>
          </>
        )}
        {loading && (
          <div className="news-list-loading">
            {Array(8)
              .fill(null)
              .map((item, index) => (
                <NewsItemLoading key={index}></NewsItemLoading>
              ))}
          </div>
        )}
        {total > posts.length && (
          <AppButton className="btn-loadmore" onClick={handleLoadmore}>
            Xem thêm
          </AppButton>
        )}
      </NewsListPageStyles>
    </>
  );
};

export default NewsListPage;
