import { useContext } from "react";
import { FilesContext } from "../context/FilesContext";

const FilesPreview = ({ files }) => {

  const renderFiles = () => {
    if (files.length > 0) {
      return files.map(({ type, src }, index) => {
        if (type === "image") {
          return (
            <div key={index} className="position-relative d-inline-block">
              <img src={src} className="thumbnail mx-2 br-10 mb-3" />
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
