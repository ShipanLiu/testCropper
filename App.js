import React, {useRef, useState} from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Text,
  View,
  width,
  height,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import CustomCrop from './components/Cropper';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import uuid from 'react-native-uuid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowWidth);

export default function ImgCropper() {
  const customCropRef = useRef(null);
  const [initialImages, setImitialImages] = useState([
    // {
    //   fileName: 'IMG_9290.jpeg',
    //   height: 3024,
    //   id: '3bd2f66c-3dd1-4df8-a061-c4a10d6b477e',
    //   localIdentifier: 43,
    //   mime: 'image/jpeg',
    //   path: 'content://media/external/file/43',
    //   realPath: '/storage/emulated/0/Download/IMG_9290.jpeg',
    //   width: 4032,
    // },
    // {
    //   fileName: 'IMG_9289.jpeg',
    //   height: 3024,
    //   id: '5dd7438d-636b-4f7e-af05-9ce88b0c362a',
    //   localIdentifier: 42,
    //   mime: 'image/jpeg',
    //   path: 'content://media/external/file/42',
    //   realPath: '/storage/emulated/0/Download/IMG_9289.jpeg',
    //   width: 4032,
    // },
    // {
    //   fileName: '6fc1b57f-caf9-4908-860a-d02a37ce6b41.jpeg',
    //   height: 1599,
    //   id: 'b109511d-b926-41f9-9288-f47c3e2da844',
    //   localIdentifier: 41,
    //   mime: 'image/jpeg',
    //   path: 'content://media/external/file/41',
    //   realPath:
    //     '/storage/emulated/0/Download/6fc1b57f-caf9-4908-860a-d02a37ce6b41.jpeg',
    //   width: 899,
    // },
    {
      fileName: '831e827f-ff4c-46aa-b4a9-22952fdf1df7.jpeg',
      height: 1599,
      id: '68e5482f-5120-4deb-840e-3984d2063d6d',
      localIdentifier: 40,
      mime: 'image/jpeg',
      path: 'content://media/external/file/40',
      realPath:
        '/storage/emulated/0/Download/831e827f-ff4c-46aa-b4a9-22952fdf1df7.jpeg',
      width: 899,
    },
  ]);

  function buildImgObj(imgObj) {
    return {
      id: uuid.v4(),
      localIdentifier: imgObj.localIdentifier,
      path: imgObj.path,
      realPath: imgObj.realPath,
      fileName: imgObj.fileName,
      mime: imgObj.mime,
      height: imgObj.height,
      width: imgObj.width,
    };
  }

  openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        isExportThumbnail: true,
        singleSelectedMode: false,
        usedCameraButton: false,
        selectedColor: '#f9813a',
      });
      const newImageArr = response.map(imgObj => buildImgObj(imgObj));
      console.log(newImageArr);
      setImitialImages(newImageArr);
    } catch (e) {
      console.log(e);
    }
  };

  const crop = () => {
    const newCoordi = customCropRef.current.crop();
    console.log(newCoordi);
  };

  return (
    <View>
      <TouchableOpacity onPress={openPicker} style={styles.pickerBtn}>
        <Text style={{color: 'green'}}>pick IMAGE</Text>
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {initialImages?.map(imgObj => (
          <View key={imgObj.id} style={styles.cropperContainer}>
            <CustomCrop
              // updateImage={this.updateImage.bind(this)}
              // rectangleCoordinates={this.state.rectangleCoordinates}
              initialImage={imgObj.path}
              height={imgObj.height}
              width={imgObj.width}
              ref={customCropRef}
              overlayColor="rgba(18,190,210, 1)"
              overlayStrokeColor="rgba(20,190,210, 1)"
              handlerColor="rgba(20,150,160, 1)"
              enablePanStrict={false}
            />
            <TouchableOpacity onPress={crop} style={styles.cropBtn}>
              <Text style={{color: 'red'}}>CROP IMAGE</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },

  cropperContainer: {
    marginTop: 0,
    width: windowWidth,
    height: windowHeight,
  },

  cropBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },

  pickerBtn: {
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 10,
  },
});
