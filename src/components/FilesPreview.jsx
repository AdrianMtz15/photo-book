
const FilesPreview = ({ files, handleDelete }) => {
  const renderFiles = () => {
    if (files.length > 0) {
      return files.map(({ type, src }, index) => {
            if (type === "image") {
              return (
                <div key={index} className="position-relative d-inline-block">
                  <img src={src} className="thumbnail mx-2 br-10 mb-3" />
                  <button
                    style={{ position: "absolute", top: -15, right: -5 }}
                    className="btn text-danger"
                    onClick={() => handleDelete(index)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              );
            } else if (type === "video") {
              return (
                <div key={index} className="position-relative d-inline-block">
                  <video className="thumbnail mx-2 br-10 mb-3">
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              );
            }
          })
      }
    }

  return <div className="d-flex flex-wrap justify-content-evenly mt-3">{renderFiles()}</div>;
};

export default FilesPreview;
