import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';
import { Check, X, AlertTriangle } from 'lucide-react';
import { colors } from '@/constants/content';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error' | 'warning';

interface ShowToastProps {
  message: string;
  type?: ToastType;
  options?: ToastOptions;
}

const getToastIcon = (type: ToastType) => {
  const baseClasses = "w-6 h-6 p-1 rounded-full flex items-center justify-center";
  
  switch (type) {
    case 'success':
      return (
        <div 
          className={baseClasses}
          style={{ 
            backgroundColor: colors.success,
            minWidth: '24px',
            minHeight: '24px'
          }}
        >
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      );
    case 'error':
      return (
        <div 
          className={baseClasses}
          style={{ 
            backgroundColor: colors.error,
            minWidth: '24px',
            minHeight: '24px'
          }}
        >
          <X className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      );
    case 'warning':
      return (
        <div 
          className={baseClasses}
          style={{ 
            backgroundColor: colors.warning,
            minWidth: '24px',
            minHeight: '24px'
          }}
        >
          <AlertTriangle className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      );
    default:
      return null;
  }
};

export function showToast({
  message,
  type = 'success',
  options = {},
}: ShowToastProps) {
  // Get the appropriate toast function
  const toastFn = type === 'error' ? toast.error : 
                  type === 'warning' ? toast.warn : 
                  toast.success;

  // Get the appropriate border color based on type
  const getBorderColor = (toastType: ToastType) => {
    switch (toastType) {
      case 'success': return colors.success;
      case 'error': return colors.error;
      case 'warning': return colors.warning;
      default: return colors.toast;
    }
  };

  toastFn(
    <div className="flex items-center gap-3">
      {getToastIcon(type) || <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">!</div>}
      <span className="text-gray-800 font-medium">{message}</span>
    </div>,
    {
      position: options.position,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: 'white',
        border: `2px solid ${getBorderColor(type)}`,
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      ...options,
    }
  );
}