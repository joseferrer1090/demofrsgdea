import React, { useState, useRef, useEffect } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import { Row, Col, ToastBody, Toast, ToastHeader, Spinner } from "reactstrap";

const MyPdfViewer = props => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);
  const [id, setId] = useState(props.id);
  const [filename, setFilename] = useState(props.filename);

  const { pdfDocument, pdfPage } = usePdf({
    file: `http://192.168.0.19:8090/api/sgdea/service/filing/emails/view/file/${id}/${filename}`,
    page,
    canvasRef,
    pdfPage
  });

  const validateValues = () => {
    if (PreValue !== props.id) {
      setPage(1);
    }
  };

  useEffect(() => {
    setId(props.id);
    setFilename(props.filename);
    validateValues();
  }, [props.id, props.filename, props.infoData]);

  const PreviousValues = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
  };
  const PreValue = PreviousValues(props.id);

  return (
    <div>
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <center>
          <nav>
            <Row>
              <Col>
                <button
                  className="btn btn-secondary btn-sm"
                  data-trigger="hover"
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                >
                  {" "}
                  <i className="fa fa-backward" />{" "}
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  data-trigger="hover"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  {" "}
                  <i className="fa fa-chevron-left" />{" "}
                </button>
                <button
                  disabled
                  className="btn btn-secondary btn-sm"
                  data-trigger="hover"
                >
                  {`${page} de ${pdfDocument.numPages}`}
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  data-trigger="hover"
                  disabled={page === pdfDocument.numPages}
                  onClick={() => setPage(page + 1)}
                >
                  {" "}
                  <i className="fa fa-chevron-right" />{" "}
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  data-trigger="hover"
                  disabled={page === pdfDocument.numPages}
                  onClick={() => setPage(pdfDocument.numPages)}
                >
                  {" "}
                  <i className="fa fa-forward" />{" "}
                </button>
              </Col>
            </Row>
          </nav>
        </center>
      )}
      <br />
      <center>
        {!pdfDocument && (
          <span>
            <center>
              <div className="p-3 bg my-2 rounded">
                <Toast>
                  <ToastHeader icon={<Spinner size="sm" />}>
                    Visualizar archivos
                  </ToastHeader>
                  <ToastBody>
                    <b>Seleccione un archivo para visualizarlo.</b>
                  </ToastBody>
                </Toast>
              </div>
            </center>
          </span>
        )}
        <canvas ref={canvasRef} />
      </center>
    </div>
  );
};
export default MyPdfViewer;
