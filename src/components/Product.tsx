import React, { useEffect, useState } from "react";
import data from "./data.json";

const ProductPage = () => {
  const minZoom = 50;
  const [value, setValue] = useState(50);
  const [activePic, setActivePic] = useState(0);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(4);
  const [pBtnDisabled, setPBtnDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const [dataThumbNails, setdataThumbNails] = useState(
    data.slice(firstIndex, lastIndex)
  );

  const prevBtnHanlder = () => {
    setNextButtonDisabled(false);
    setFirstIndex((prev) => prev - 1);
    setLastIndex((last) => last - 1);
  };

  const nextBtnHanlder = () => {
    setPBtnDisabled(false);
    setFirstIndex((prev) => prev + 1);
    setLastIndex((last) => last + 1);
  };

  useEffect(() => {
    setdataThumbNails([...data.slice(firstIndex, lastIndex)]);
    lastIndex == data.length
      ? setNextButtonDisabled(true)
      : setNextButtonDisabled(false);
    firstIndex == 0 ? setPBtnDisabled(true) : setPBtnDisabled(false);
  }, [firstIndex, lastIndex]);

  const zoomHandler = (e) => {
    setValue(Math.max(minZoom, +e.target.value));
  };

  return (
    <div className="wrap">
      <div className="w-inside">
        <div className="pagination">
          <button
            className={` btn ${pBtnDisabled == true ? " btn-inactive" : ""} `}
            disabled={pBtnDisabled}
            onClick={prevBtnHanlder}
          >
            <div className="symbol prev"></div>
          </button>
          <div className="th-wrap">
            {dataThumbNails.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img}
                  alt=""
                  className={`thumbnail ${
                    activePic === idx ? "th-active" : ""
                  }`}
                  onClick={() => setActivePic(idx)}
                />
              </div>
            ))}
          </div>
          <button
            className={` btn ${
              nextButtonDisabled == true ? " btn-inactive" : ""
            } `}
            disabled={nextButtonDisabled}
            onClick={nextBtnHanlder}
          >
            <div className="symbol next"></div>
          </button>
        </div>
        <div className="">
          <img
            src={data[activePic]}
            alt=""
            className={`active-img  ${value > 50 ? "zoom-out" : "zoom-in"}`}
            style={{ transform: `scale(${value / 50})` }}
            onClick={() => (value > 50 ? setValue(50) : setValue(100))}
          />

          <input
            type="range"
            min={minZoom}
            max={200}
            value={value}
            onChange={(e) => zoomHandler(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
