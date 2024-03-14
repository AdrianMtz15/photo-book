import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext, useState, useEffect } from "react";
import { PostsContext } from "../context/PostsContext";
import { styled } from "@mui/material/styles";
import FilesPreview from "../components/FilesPreview";
import { ModalContext } from "../context/ModalContext";

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
  const { modalComponent } = useContext(ModalContext);
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

  useEffect(() => {
    if (srcSet.length > 0) {
      modalComponent("Subir Recuerdos", <FilesPreview files={srcSet} />);
    }
  }, [srcSet]);

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
