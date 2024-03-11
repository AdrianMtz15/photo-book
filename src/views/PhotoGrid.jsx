import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PhotoGrid = () => {
  const itemData = [
    {
      img: '/random-1.jpg',
      title: 'random img'
    },
    {
      img: '/random-2.webp',
      title: 'random img'
    },
    {
      img: '/random-3.jpeg',
      title: 'random img'
    },
    {
      img: '/random-4.jpg',
      title: 'random img'
    },
    {
      img: '/random-5.jpeg',
      title: 'random img'
    },
  ];
  return(
    <Box
      component={'div'}
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ImageList variant="masonry" cols={3} gap={8} sx={{paddingX: '10px'}}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} className="" style={{
            borderRadius: '5px'
          }}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{
                borderRadius: '5px'
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Button
        className="gradient"
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon/>}
        sx={{
          position: 'fixed',
          bottom: 10,
        }}
      >
        Cargar Foto
        <VisuallyHiddenInput type="file" accept="image/*" />
      </Button>
    </Box>
    
  )
}

export default PhotoGrid;