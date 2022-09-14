import { toast, ToastOptions } from 'react-toastify';

const toasterStyle: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
};

export const toasterSuccess = (text: string): void => {
    toast.success(`${text}`, toasterStyle);
};

export const toasterError = (text: string): void => {
    toast.error(`${text}`, toasterStyle);
};
