import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import beer from "./assets/beer.png";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import { useRef, useState } from "react";

function App() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const checkRef = useRef(false);
  const locRef = useRef(null);

  const getPosInfo = async () => {
    const location = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve(coords);
        },
        (error) => {
          reject(error);
          alert("HTTPS 환경이 아니거나 localhost가 아닙니다.");
        }
      );
    });

    location.then((coords) => {
      getAroundData(coords.longitude, coords.latitude);
    });
  };

  const getAroundData = async (longitude, latitude) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://dapi.kakao.com/v2/local/search/keyword",
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
          },
          params: {
            x: longitude,
            y: latitude,
            radius: 1000,
            query: "맥주",
          },
        }
      );
      setDataList(data.documents);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const getLocationData = async (location) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://dapi.kakao.com/v2/local/search/keyword",
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
          },
          params: {
            query: location + " 맥주",
          },
        }
      );
      setDataList(data.documents);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const showDataList = () => {
    if (isLoading) {
      return <div>로딩중..</div>;
    }

    if (!dataList.length) {
      return (
        <NoData>
          <p>아무고토 없어요</p>
          <img src={beer} alt="맥주" />
        </NoData>
      );
    } else {
      return dataList.map(
        ({ id, phone, address_name, place_name, place_url, distance }) => (
          <Store key={id}>
            <StoreName>
              <a href={place_url}>{place_name}</a>
            </StoreName>
            <StorePhone>{phone ? phone : "번호가 없어요"}</StorePhone>
            <StoreInfo>
              {checkRef.current.checked ? `${distance} 미터` : address_name}
            </StoreInfo>
          </Store>
        )
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkRef.current.checked) {
      getPosInfo();
    } else {
      getLocationData(locRef.current.value);
    }
  };

  const handleClick = () => {
    if (checkRef.current.checked) {
      locRef.current.setAttribute("disabled", true);
    } else {
      locRef.current.removeAttribute("disabled");
    }
  };

  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <MainContainer>
          <Title>맥주가 술이야 ?</Title>
          <SearchForm onSubmit={(e) => handleSubmit(e)}>
            <SearchAround>
              <label htmlFor="around">현재 위치에서 검색하기</label>
              <input
                ref={checkRef}
                id="around"
                type="checkbox"
                onClick={() => handleClick()}
              />
            </SearchAround>
            <SearchLocation>
              <input
                ref={locRef}
                type="text"
                placeholder="지역을 입력해주세요."
              />
              <button type="submit">
                <MdSearch />
              </button>
            </SearchLocation>
          </SearchForm>
          <Result>{showDataList()}</Result>
        </MainContainer>
      </MainWrapper>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'LeferiPoint-WhiteObliqueA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/LeferiPoint-WhiteObliqueA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    background-color: black;
  }
`;

const MainWrapper = styled.div`
  padding: 20px;
  height: 100vh;
  color: white;
  font-family: "LeferiPoint-WhiteObliqueA";
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 25rem;
`;

const Title = styled.div`
  padding: 20px 0;
  font-size: 3rem;
  font-weight: bold;
  border-bottom: 2px solid #ffda53;
  text-align: center;
`;

const SearchForm = styled.form`
  color: white;
  border-bottom: 2px solid #ffda53;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;

const SearchAround = styled.div`
  padding-bottom: 10px;

  label:hover,
  input:hover {
    cursor: pointer;
  }
`;

const SearchLocation = styled.div`
  display: flex;
  color: white;

  input {
    background-color: #333232;
    width: 15rem;
    height: 2.5rem;
    border: 1px solid white;
    border-radius: 20px;
    color: #ffda53;
    font-size: 15px;

    &:focus {
      color: white;
    }
  }

  button {
    color: white;
    background: none;
    font-size: 35px;
    cursor: pointer;
    margin-left: 3px;

    &:hover {
      color: #ffda53;
    }
  }
`;

const Result = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Store = styled.div`
  color: black;
  width: 23rem;
  height: 5rem;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.03);
    background-color: #ffda53;
  }
`;

const StoreName = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 5px;

  & > a {
    text-decoration: none;

    &:link,
    &:visited {
      color: black;
    }

    &:hover {
      color: white;
    }
  }
`;

const StorePhone = styled.div`
  width: 9rem;
  height: 1rem;
  background-color: #333232;
  color: white;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 10px;
  text-align: center;
`;

const StoreInfo = styled.div`
  font-weight: bolder;
  text-align: right;
`;

const NoData = styled.div`
  padding-top: 3rem;
  text-align: center;

  & > img {
    width: 30rem;
  }
`;
