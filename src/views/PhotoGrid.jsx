import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext, useState, useEffect } from "react";
import { PostsContext } from "../context/PostsContext";
import { FilesContext } from "../context/FilesContext";
import { styled } from "@mui/material/styles";
import UploadForm from "./UploadForm";
import { S3_ENDPOINT } from "../utils";

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
  const { clearUploads } = useContext(FilesContext);
  const [srcSet, setSrcSet] = useState([]);
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    handleFilesPreview();
  }, [files]);

  const fetchPosts = () => getPosts({ page });

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

  const handleFiles = (e) => {
    setFiles(e.target.files);
  };

  const handleCancel = () => {
    clearUploads();
    setSrcSet([]);
  };

  const handleCallback = () => {
    clearUploads();
    setSrcSet([]);
    fetchPosts();
  };

  const renderButton = () => {
    if (srcSet.length === 0) {
      return (
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
          Subir Fotos
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            multiple={true}
            onChange={handleFiles}
          />
        </Button>
      );
    }
  };

  const renderPosts = () => {
    if (Array.isArray(posts)) {
      return (
        <ImageList variant="masonry" cols={3} gap={8} sx={{ paddingX: "10px" }}>
          {posts.map((item) => (
            <ImageListItem
              key={item.file_id}
              style={{
                borderRadius: "5px",
              }}
            >
              <img
                srcSet={`${S3_ENDPOINT}/${item.name}.${item.type}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${S3_ENDPOINT}/${item.name}.${item.type}?w=248&fit=crop&auto=format`}
                alt={item.name}
                loading="lazy"
                style={{
                  borderRadius: "5px",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      );
    }
  };

  const renderFiles = () => {
    if (srcSet.length > 0) {
      return (
        <UploadForm
          files={files}
          srcSet={srcSet}
          handleCancel={handleCancel}
          handleCallback={handleCallback}
        />
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
      {renderPosts()}
      {renderFiles()}
      {renderButton()}
    </Box>
  );
};

export default PhotoGrid;
