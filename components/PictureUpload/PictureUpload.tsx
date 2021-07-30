import { FC, useEffect } from 'react';
import { storage } from 'lib/auth/firebase';
import { useRouter } from 'next/router';
import useStyles from './PictureUpload.styles';
import { layoutErrorVar } from 'apollo/cache';

const MAX_FILE_SIZE_IN_BYTES = 10485760; // equal to 10MB

const PictureUpload: FC = () => {
  const classes = useStyles();
  const idFromQueryString = useRouter().query.id;
  const storageRef = storage.ref(
    `/talents/${idFromQueryString}/images/profile-picture`,
  );

  const handleImageClick = (): void => {
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
        .catch((e) => layoutErrorVar(e));
    };

    const handleFileUpload = (e: Event): void => {
      e.preventDefault();
      layoutErrorVar(null);

      const target = e.target as HTMLInputElement;
      const { files } = target;
      const file = files ? files[0] : null;
      if (file) {
        if (file.size > MAX_FILE_SIZE_IN_BYTES) {
          // TODO: Better error message here:
          alert('File exceeds maximum file size');
          return;
        }

        const uploadTask = storageRef.put(file);

        // reference: https://firebase.google.com/docs/storage/web/upload-files
        uploadTask.on(
          'state_changed',
          // 1. 'state_changed' observer, called any time the state changes
          //eslint-disable-next-line
          () => {},
          // 2. Error observer, called on failure
          (e) => {
            layoutErrorVar(e);
          },
          // 3. Completion observer, called on successful completion
          () => {
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
        onClick={handleImageClick}
        className={classes.imageInput}
      ></input>
      <input type="file" id="file-input" className={classes.fileInput} />
    </div>
  );
};

export default PictureUpload;
