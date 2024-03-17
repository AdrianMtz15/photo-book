import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext, useState, useEffect } from "react";
import { PostsContext } from "../context/PostsContext";
import { FilesContext } from "../context/FilesContext";
import { styled } from "@mui/material/styles";
import UploadForm from "./UploadForm";
import { S3_ENDPOINT } from "../utils";
import { ModalContext } from "../context/ModalContext";
import FilesPreview from "../components/FilesPreview";

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

const PhotoGrid = ({ page }) => {
  const { posts, getPosts } = useContext(PostsContext);
  const { modalComponent, showModal } = useContext(ModalContext);
  const {
    clearUploads,
    srcSet,
    setSrcSet,
    inputFiles,
    setInputFiles,
    getFiles,
    files,
  } = useContext(FilesContext);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPosts(page);
    getFiles(page);
  }, [page]);

  useEffect(() => {
    if (srcSet.length > 0) {
      modalComponent("Subir Recuerdos", <FilesPreview files={srcSet} />);
    }
  }, [srcSet]);

  useEffect(() => {
    handleFilesPreview();
  }, [inputFiles]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const fetchPosts = () => getPosts({ page });

  const handleFilesPreview = () => {
    const result = [];
    const promises = [];
    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i];
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
    setInputFiles(e.target.files);
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
    if (!showModal) {
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
    if (Array.isArray(files) && files.length > 0) {
      console.log("🚀: renderPosts -> files", files);
      return (
        <ImageList
          variant="masonry"
          cols={3}
          gap={8}
          sx={{ paddingX: "10px", paddingTop: "1rem" }}
        >
          {files.map((item) => (
            <ImageListItem
              key={item.file_id}
              style={{
                borderRadius: "5px",
              }}
              onClick={() => handleImageClick(item)}
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
        flex: 1,
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {renderPosts()}
      {/* {renderFiles()} */}

      {renderButton()}
      <Dialog open={!!selectedImage} onClose={handleClose}>
        <DialogContent>
          {selectedImage && (
            <>
              <img
                src={`${S3_ENDPOINT}/${selectedImage.name}.${selectedImage.type}?w=248&fit=crop&auto=format`}
                alt={selectedImage.name}
                style={{ maxHeight: "700px" }}
              />
              <h6>{selectedImage?.post?.content}</h6>
              <p>- {selectedImage?.user?.name}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PhotoGrid;
