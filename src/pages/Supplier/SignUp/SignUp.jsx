import { React, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Form from './components/Form';
import CadMerenda from './components/cadMerenda';
import Button from './components/Button';
import { submit, handleCep } from './Handler';
import logo from '../../../assets/images/seducalagoaslogo.svg';

function SignUp2() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const triggerAlert = (message) => {
    setErrorMessage(message);
    setOpen(true);
  };

  const allFiles = [];
  const amount = 4;

  const getFiles = (from, uploaded) => {
    console.log('Certificates got:', uploaded);

    const i = allFiles.findIndex((e) => e.from === from);
    // eslint-disable-next-line
    if (i > -1) {
      allFiles[i].uploaded = uploaded;
      console.log('Replaced!');
    } else {
      allFiles.push({
        uploaded,
        from,
      });
    }

    console.log(allFiles);
  };

  const handleClick = () => {
    if (allFiles.length !== amount) triggerAlert('Insira todos os arquivos.');
    else {
      try {
        submit();
      } catch (error) {
        console.error(error);
        triggerAlert(error.message);
      }
    }
  };

  const toastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div
      className="min-h-screen md:min-h-screen lg:min-h-screen flex
      gap-10 flex-col bg-[#005CA9] mt-0 text-md md:text-sm"
    >
      <CadMerenda />
      <Snackbar open={ open } autoHideDuration={ 5000 } onClose={ toastClose }>
        <Alert
          severity="error"
          elevation={ 6 }
          variant="filled"
          onClose={ toastClose }
          sx={ { width: '100%' } }
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <div
        className="flex flex-col justify-center items-center
        bg-[#fff] h-fit w-full rounded-xl self-center xl:w-[80%] py-10 mb-10"
      >
        <Form func={ getFiles } cep={ handleCep } />
        <Button func={ handleClick } />
      </div>
      <img
        className="h-20 mb-10 md:w-[h-60] md:mt-2 md:mb-10
        md:flex self-center md:justify-self-end"
        src={ logo }
        alt=""
      />
    </div>
  );
}

export default SignUp2;
