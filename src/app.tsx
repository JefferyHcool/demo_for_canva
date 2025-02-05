import {Box, Button, FileInput, FormField, Rows, SegmentedControl, Slider, Text} from "@canva/app-ui-kit";
import styles from "styles/components.css";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {addElementAtPoint, selection} from "@canva/design";
import {getTemporaryUrl} from "@canva/asset";
import type {

  ImageElementAtPoint
} from "@canva/design";
import {requestOpenExternalUrl} from "@canva/platform";
export const App = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [opacity, setOpacity] = useState(100);
  const [imgOrientation, setImgOrientation] = useState<'Horizontal' | 'Vertical'>('Horizontal');
  const [showWorkSpace, setShowWorkSpace] = useState(false);
  const [isEdit, setIsEdit]= useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    return selection.registerOnChange({
      scope: "image",
      onChange: setSelection,
    });
  }, []);

  const setSelection = async (selection) => {


      if (selection.count > 0) {
        if (selection.scope !== "image") {
          setShowWarning(true);
        }

        setIsSelected(true);
        const draft = await selection.read();
        const ref = draft.contents[0]?.ref;
        if (ref) {
          const { url } = await getTemporaryUrl({ type: "image", ref });
          setImgUrl(url);
        }

        setCurrentSelection(draft);
      } else {
        setIsSelected(false);
        setShowWarning(false);
      }


  }


  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImage(event.target as HTMLImageElement);
    setShowWorkSpace(true);

  };

  const resetData = () => {
    setImgUrl('');
    setShowWorkSpace(false);
    setOpacity(100);
    setImgOrientation('Horizontal');
    setIsEdit(false);
  };
  const getDataFromCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
     // Convert canvas to image URL
    return canvas.toDataURL("image/png");
  };
  const onFileChange = async (files: File[]) => {
    if (files.length > 0) {
      const fileUrl = URL.createObjectURL(files[0]);
      setImgUrl(fileUrl);
      setShowWorkSpace(true);
    }
  };
  const onAdd=  async () => {
    const data=getDataFromCanvas()
    await addElementAtPoint({
      type: 'image',
      dataUrl: data,
    } as ImageElementAtPoint);
  };
  const drawMirrorFlip = () => {
    if (!canvasRef.current || !image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    ctx?.save();
    ctx!.globalAlpha = opacity / 100; // Apply opacity dynamically
    if (imgOrientation === 'Horizontal') {
      ctx?.scale(-1, 1); // Horizontal flip
      ctx?.drawImage(image, -image.width, 0); // Draw the image at the mirrored position
    } else {
      ctx?.scale(1, -1); // Vertical flip
      ctx?.drawImage(image, 0, -image.height); // Draw the image at the mirrored position
    }
    ctx?.restore();
  };



  useLayoutEffect(() => {
    if (showWorkSpace && image) {
      drawMirrorFlip();
    }
  }, [showWorkSpace, opacity, image, imgOrientation]);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.crossOrigin = "Anonymous"
    img.onload = handleImageLoad; // Trigger the image load handler when image is loaded

  }, [imgUrl]);

  return showWorkSpace ? (
      <div className={styles.scrollContainer}>
        <Rows spacing="2u">
          <Rows spacing="1u">
            <canvas ref={canvasRef}></canvas>
          </Rows>
          <Rows spacing="1u">
            <Text variant="bold">Orientation</Text>
            <SegmentedControl
                options={[
                  { label: 'Horizontal', value: 'Horizontal' },
                  { label: 'Vertical', value: 'Vertical' },
                ]}
                value={imgOrientation}
                onChange={(value) => setImgOrientation(value as 'Horizontal' | 'Vertical')}
            />
          </Rows>
          <Rows spacing="1u">
            <Text variant="bold">Opacity</Text>
            <Box paddingStart="2u">
              <Slider
                  value={opacity}
                  onChange={setOpacity}
                  max={100}
                  min={0}
                  step={1}
              />
            </Box>
          </Rows>
          <Button variant="primary" onClick={onAdd}>Add to design</Button>
          <Button variant="secondary" onClick={resetData}>Go back</Button>
        </Rows>
      </div>
  ) : (
      <div className={styles.scrollContainer}>
        <Rows spacing="2u">
          <Rows spacing="1u">
            <Text>Upload an image or select one in your design</Text>
            <FormField label="Upload image" control={(props) => (
                <FileInput
                    {...props}
                    accept={["image/png", "image/jpeg", "image/jpg", "image/webp"]}
                    stretchButton
                    onDropAcceptedFiles={onFileChange}
                />
            )} />
          </Rows>
        </Rows>
      </div>
  );
};
