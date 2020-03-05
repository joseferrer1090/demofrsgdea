import React, { useState, useEffect, useRef } from "react";
import { usePdf } from "react-pdf-js";

const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    let previousButton = (
      <button onClick={() => setPage(page - 1)}>
        <i className="fa fa-arrow-left"></i> Previous
      </button>
      //   <li className="previous" >
      //     <a href="#">

      //     </a>
      //   </li>
    );
    if (page === 1) {
      previousButton = (
        <button disabled onClick={() => setPage(page - 1)}>
          <i className="fa fa-arrow-left"></i> Previous
        </button>
        // <li className="previous disabled">
        //   <a href="#">
        //     <i className="fa fa-arrow-left"></i> Previous
        //   </a>
        // </li>
      );
    }
    let nextButton = (
      <button onClick={() => setPage(page + 1)}>
        Next <i className="fa fa-arrow-right"></i>
      </button>
      //   <li className="next" onClick={() => setPage(page + 1)}>
      //     <a href="#">
      //       Next <i className="fa fa-arrow-right"></i>
      //     </a>
      //   </li>
    );
    if (page === pages) {
      nextButton = (
        <button disabled onClick={() => setPage(page + 1)}>
          Next <i className="fa fa-arrow-right"></i>
        </button>
        // <li className="next disabled">
        //   <a href="#">
        //     Next <i className="fa fa-arrow-right"></i>
        //   </a>
        // </li>
      );
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  };

  const canvasEl = useRef(null);

  const [loading, numPages] = usePdf({
    file:
      "http://192.168.10.180:8090/api/sgdea/service/filing/emails/view/file/0c29f416-1ad4-4226-b546-7b1db2da6f71/744d45ff-cded-467d-a999-7a94e06c07a5.pdf",
    // onDocumentComplete,
    page,
    canvasEl
  });

  useEffect(() => {
    setPages(numPages);
  }, [numPages]);

  return (
    <div>
      {loading && <span>Loading...</span>}
      <canvas ref={canvasEl} />
      {renderPagination(page, pages)}
    </div>
  );
};

export default MyPdfViewer;
