import { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { storage } from 'lib/auth/firebase';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  imageInput: {
    backgroundColor: 'rgb(255, 255, 255)',
    border: '2px solid rgba(211, 220, 225, 1)',
    borderRadius: '50%',
    height: '100%',
    width: '100%',
  },
  fileInput: {
    display: 'none',
  },
});

const PictureUpload: FC = () => {
  const classes = useStyles();
  const idFromQueryString = useRouter().query.id;
  const storageRef = storage.ref(
    `/talents/${idFromQueryString}/images/profile-picture`,
  );

  //   const [value, setValue] = useState('');

  const handleClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.click();
  };

  const handleFileUpload = (e) => {
    const fileList = e.target.files;
    const file = fileList[0];
    // can insert more conditions here, e.g. if filesize < X;
    if (file) {
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        'state_changed',
        function progress(snapshot) {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('uploading percentage: ' + percentage);
        },
        function error(err) {
          console.log('upload error', err);
        },
        function complete() {
          console.log('complete');
          // downloadImage();
        },
      );
    }
  };

  useEffect(() => {
    const setFileInputEventListener = async () => {
      const fileInput = document.getElementById(
        'file-input',
      ) as HTMLInputElement;
      fileInput.addEventListener('change', handleFileUpload, false);
    };

    setFileInputEventListener();
  }, []);

  return (
    <div className={classes.root}>
      <input
        type="image"
        id="image-input"
        alt="Profile Picture"
        src=""
        onClick={handleClick}
        className={classes.imageInput}
      ></input>
      <input type="file" id="file-input" className={classes.fileInput} />
    </div>
  );
};

export default PictureUpload;
