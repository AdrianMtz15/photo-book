
const FilesPreview = ({ files }) => {
  const renderFiles = () => {
    if (files.length > 0) {
      return files.map(({ type, src }, index) => {
        if (type === "image") {
          return (
            <div key={index} className="col-4 col-md-3">
              <img
                src={src}
                loading="lazy"
                className="mw-100 w-100 d-block m-auto"
              />
            </div>
          );
        } else if (type === "video") {
          return (
            <div key={index} className="col-4 col-md-3">
              <video className="w-100 w-100 d-block m-auto mx-2 br-10">
                <source src={src} type="video/mp4" />
              </video>
            </div>
          );
        }
      });
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">{renderFiles()}</div>
    </div>
  );
};

export default FilesPreview;
