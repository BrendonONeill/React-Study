import React, { useEffect } from "react";
import Loading from "./Loading";

function Card({ cardData, error }) {
  useEffect(() => {
    if (cardData !== null) {
      console.log("rerender");
    }
    console.log(cardData);
  }, [cardData]);
  return (
    <>
      {error !== null ? (
        <div>
          <h1>Massive error</h1>
        </div>
      ) : cardData === null ? (
        <Loading />
      ) : (
        <div>
          <img src={cardData.url} alt="testing" />
        </div>
      )}
    </>
  );
}

export default Card;
