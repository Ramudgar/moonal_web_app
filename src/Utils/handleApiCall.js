// src/Utils/handleApiCall.js

import { toast } from 'react-toastify';
import { parseApiError } from './errorHandler';

export const handleApiCall = async ({
  apiFunc,
  onSuccess,
  onError,
  loadingMsg = 'Please wait...',
  successMsg,
  errorMsg,
  showToast = true,
}) => {
  let toastId;

  try {
    if (showToast) {
      toastId = toast.loading(loadingMsg);
    }

    const response = await apiFunc();
    console.log('API Response:', response);
    const data = response?.data || response;

    if (showToast) {
      toast.update(toastId, {
        render:  data?.message || successMsg || 'Success!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    }

    onSuccess?.(data);
  } catch (error) {
    const friendly = parseApiError(error);

    if (showToast) {
      toast.update(toastId, {
        render: friendly||errorMsg ,
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      });
    }

    onError?.(friendly);
  }
};
