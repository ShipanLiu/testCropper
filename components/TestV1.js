/*
 {"bottomLeft": {"x": 511, "y": 730}, "bottomRight": {"x": 507, "y": 521},
"dimensions": {"height": 1280, "width": 720}, "topLeft": {"x": 347, "y": 721}, "topRight": {"x": 348, "y": 449}}

*/

import React, {useState, useRef} from 'react';
import {View, Text, Image, StyleSheet, Button, Dimensions} from 'react-native';
import RectScanner from './RectScanner';

import CustomCrop from './Cropper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowWidth);

export default function TestV1(props) {
  const [takenPhoto, setTakenPhoto] = useState({
    initialImage: null,
    croppedImage: null,
  });
  const [coordinates, setCoordinates] = useState(null);
  const [size, setSize] = useState({height: 1280, width: 720});
  const cropperRef = useRef(null);

  const onCancel = () => {
    console.log('cancel Clicked');
  };

  const onPictureTaken = data => {
    console.log(data);
    setTakenPhoto({
      initialImage: data.initialImage,
      croppedImage: data.croppedImage,
    });
  };

  const createRectangle = data => ({
    topLeft: data.topLeft,
    topRight: data.topRight,
    bottomRight: data.bottomRight,
    bottomLeft: data.bottomLeft,
  });

  const getCoordination = detectedRectangle => {
    console.log(detectedRectangle);
    setCoordinates(createRectangle(detectedRectangle));
    setSize(detectedRectangle.dimensions);
  };

  console.log(coordinates);
  console.log(size);

  return (
    <>
      {takenPhoto ? (
        <View>
          <Text>photo exists</Text>
          <Button title="clear" onPress={() => setTakenPhoto(null)} />
          <View style={styles.cropperContainer}>
            <CustomCrop
              // updateImage={this.updateImage.bind(this)}
              rectangleCoordinates={coordinates}
              initialImage={takenPhoto.initialImage}
              height={size.height}
              width={size.width}
              ref={cropperRef}
              overlayColor="rgba(18,190,210, 1)"
              overlayStrokeColor="rgba(20,190,210, 1)"
              handlerColor="rgba(20,150,160, 1)"
              enablePanStrict={false}
            />
          </View>

          {/* <Image
            source={{uri: takenPhoto.initialImage}}
            style={styles.croppedImg}
          />
          <Image
            source={{uri: takenPhoto.croppedImage}}
            style={styles.croppedImg}
          /> */}
        </View>
      ) : (
        <RectScanner
          onPictureTaken={onPictureTaken}
          onCancel={onCancel}
          getCoordination={getCoordination}
          // onPictureProcessed={onPictureProcessed}
          hideSkip
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  croppedImg: {
    width: 200,
    height: 200,
  },
  cropperContainer: {
    marginTop: 0,
    width: windowWidth,
    height: windowHeight,
  },
});
