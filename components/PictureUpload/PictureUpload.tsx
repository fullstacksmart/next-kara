import { FC, useEffect } from 'react';
import { storage } from 'lib/auth/firebase';
import { useRouter } from 'next/router';
import useStyles from './PictureUpload.styles';

const MAX_FILE_SIZE_IN_BYTES = 10485760; // equal to 10MB

const PictureUpload: FC = () => {
  const classes = useStyles();
  const idFromQueryString = useRouter().query.id;
  const storageRef = storage.ref(
    `/talents/${idFromQueryString}/images/profile-picture`,
  );

  const handleClick = (): void => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.click();
  };

  useEffect(() => {
    const setFileInputEventListener = (): void => {
      const fileInput = document.getElementById(
        'file-input',
      ) as HTMLInputElement;
      fileInput.addEventListener('change', handleFileUpload, false);
    };

    const handleFileDownload = (): void => {
      storageRef
        .getDownloadURL()
        .then((url) => {
          const imageInput = document.getElementById(
            'image-input',
          ) as HTMLImageElement;
          if (imageInput) imageInput.src = url;
        })
        .catch((e) => console.error('download error', e));
    };

    const handleFileUpload = (e): void => {
      e.preventDefault();
      const file = e.target.files[0];
      // can insert more conditions here, e.g. if filesize < X;
      if (file) {
        const uploadTask = storageRef.put(file);
        if (file.size > MAX_FILE_SIZE_IN_BYTES) {
          return;
        }

        uploadTask.on(
          'state_changed',
          // 1. 'state_changed' observer, called any time the state changes
          () => {},
          // 2. Error observer, called on failure
          (error) => {
            console.log('upload error', error);
          },
          // 3. Completion observer, called on successful completion
          () => {
            console.log('complete');
            handleFileDownload();
          },
        );
      }
    };

    handleFileDownload();
    setFileInputEventListener();
  }, [storageRef]);

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
