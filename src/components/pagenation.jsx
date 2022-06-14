import React, { memo } from "react";
import { Left, Right } from "../assets/icons";
import { PagenationContainer, PageNum } from "../styles/styledElements";

const Pagenation = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);

  return total && total > 1 ? (
    <PagenationContainer>
      <Left
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
        disabled={page === 1}
        color="#E2E6E7"
      />
      {Array(numPages)
        .fill()
        .map((_, i) => {
          return (
            <PageNum
              onClick={() => setPage(i + 1)}
              ariaCurrent={page === i + 1 ? "page" : null}
              color={page === i + 1 ? "#fff" : "rgb(99, 115, 129)"}
              key={i}
              bold={page === i + 1 ? "600" : "400"}
              background={page === i + 1 ? "#b2b2b2" : "unset"}
            >
              {i + 1}
            </PageNum>
          );
        })}
      <Right
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
        disabled={page === numPages}
        color="#E2E6E7"
      />
    </PagenationContainer>
  ) : (
    <></>
  );
};

export default memo(Pagenation);
