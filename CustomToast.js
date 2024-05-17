import React, { forwardRef, useImperativeHandle } from "react";
import { Toast } from "react-native-toast-message";

const CustomToast = forwardRef((props, ref) => {
  // Expose a method to show the toast imperatively
  useImperativeHandle(ref, () => ({
    showToast: (options) => {
      Toast.show({
        ...options,
        // Additional options you might need
      });
    },
  }));

  return null; // This component doesn't render anything
});

export default CustomToast;
