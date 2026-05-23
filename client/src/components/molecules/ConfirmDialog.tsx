import * as AlertDialog from '@radix-ui/react-alert-dialog';
import React from 'react';

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  children: React.ReactNode;
};

export const ConfirmDialog = ({
  title,
  description,
  onConfirm,
  children,
}: Props) => {
  return (
    <AlertDialog.Root>
      {/* asChild передає функцію відкриття безпосередньо у твій children-елемент */}
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        {/* Затемнення фону (Overlay) */}
        <AlertDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Саме вікно */}
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 border border-neutral-800 p-6 rounded-[8px] shadow-2xl w-[90vw] max-w-md z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <AlertDialog.Title className="text-white text-[18px] font-bold mb-2">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="text-neutral-400 text-[14px] mb-6">
            {description}
          </AlertDialog.Description>

          {/* Кнопки дій */}
          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 text-white font-medium bg-neutral-800 hover:bg-neutral-700 rounded-[4px] transition-colors">
                Скасувати
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-700 rounded-[4px] transition-colors"
              >
                Так, видалити
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
