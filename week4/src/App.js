import axios from "axios";
import { useRef, useState } from "react";

function App() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

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
      return <h2>아무고토 없어요</h2>;
    } else {
      const [check] = formRef.current.children;
      const around = check.checked;
      return dataList.map(
        ({ id, phone, address_name, place_name, place_url, distance }) => (
          <div key={id}>
            <h2>
              <a href={place_url}>{place_name}</a>
            </h2>
            <p>{phone}</p>
            {!around && <p>{address_name}</p>}
            {around && <p>{distance}미터</p>}
          </div>
        )
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formRef.current) {
      const [check, location] = formRef.current.children;
      if (check.checked) {
        getPosInfo();
      } else {
        getLocationData(location.value);
      }
    }
  };

  const handleClick = (e) => {
    const locInput = e.target.nextSibling;
    if (e.target.checked) {
      locInput.setAttribute("disabled", true);
    } else {
      locInput.removeAttribute("disabled");
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <input type="checkbox" onClick={(e) => handleClick(e)} />
        <input type="text" placeholder="지역을 입력해주세요." />
        <button type="submit">검색하기</button>
      </form>
      {showDataList()}
    </>
  );
}

export default App;
