import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext, useState, useEffect } from "react";
import { PostsContext } from "../context/PostsContext";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  position: "absolute",
  overflow: "hidden",
  height: 1,
  bottom: 0,
  width: 1,
  left: 0,
});

const PhotoGrid = () => {
  const { posts, getPosts } = useContext(PostsContext);
  const [srcSet, setSrcSet] = useState([]);
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getPosts();
  }, [page]);

  useEffect(() => {
    handleFilesPreview();
  }, [files]);

  const handleFilesPreview = () => {
    const result = [];
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.includes("image")) {
        promises.push(
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              result.push({
                src: e.target.result,
                type: "image",
              });
              resolve();
            };
            reader.readAsDataURL(file);
          })
        );
      } else if (file.type.includes("video")) {
        promises.push(
          new Promise((resolve, reject) => {
            const src = URL.createObjectURL(file);
            result.push({
              type: "video",
              src,
            });
            resolve();
          })
        );
      }
    }
    Promise.all(promises).then(() => {
      setSrcSet(result);
    });
  };

  const itemData = [
    {
      img: "/random-1.jpg",
      title: "random img",
    },
    {
      img: "/random-2.webp",
      title: "random img",
    },
    {
      img: "/random-3.jpeg",
      title: "random img",
    },
    {
      img: "/random-4.jpg",
      title: "random img",
    },
    {
      img: "/random-5.jpeg",
      title: "random img",
    },
  ];

  const handleFiles = (e) => {
    setFiles(e.target.files);
  };

  const renderPosts = () => {
    return (
      <ImageList variant="masonry" cols={3} gap={8} sx={{ paddingX: "10px" }}>
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            className=""
            style={{
              borderRadius: "5px",
            }}
          >
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{
                borderRadius: "5px",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  };

  const renderFiles = () => {
    if (srcSet.length > 0) {
      return (
        <div>
          {srcSet.map(({ type, src }, index) => {
            if (type === "image") {
              return (
                <div key={index} className="position-relative d-inline-block">
                  <img src={src} className="thumbnail mx-2 br-10" />
                  <button
                    style={{ position: "absolute", top: -15, right: -5 }}
                    className="btn text-danger"
                    onClick={() => removeFile(index)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              );
            } else if (type === "video") {
              return (
                <div key={index} className="position-relative d-inline-block">
                  <video className="thumbnail mx-2 br-10">
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              );
            }
          })}
        </div>
      );
    }
  };

  return (
    <Box
      component={"div"}
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {renderFiles()}
      <Button
        className="gradient"
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{
          position: "fixed",
          bottom: 25,
        }}
      >
        Cargar Foto
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          multiple={true}
          onChange={handleFiles}
        />
      </Button>
    </Box>
  );
};

export default PhotoGrid;
