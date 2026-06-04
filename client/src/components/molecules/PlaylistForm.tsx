import type { PlaylistDetail } from '@/types';

import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { Button } from '../atoms/Button';
import Input from '../atoms/Input';

type Props = {
  isUpdate?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  isPending: boolean;
  playlist?: PlaylistDetail;
};

const PlaylistForm = ({
  isUpdate,
  onSubmit,
  isPending,
  playlist: data,
}: Props) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FieldValues>({
    values: {
      title: isUpdate ? data?.title : '',
    },
  });

  return (
    <>
      {!data && isUpdate ? (
        <h2 className="text-center">Не вдалося отримати плейлист</h2>
      ) : (
        <form
          className="flex flex-col gap-y-3 justify-center h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            error={errors.title}
            id="title"
            placeholder={!errors.title ? 'Введіть назву' : "Назва обов'язкова"}
            {...register('title', {
              required: true,
            })}
            disabled={isPending} // isPending here
          />

          <div className="flex flex-col gap-y-1">
            <span>{`Завантажити зображення ${isUpdate ? "(необов'язково)" : "(обов'язково)"}`}</span>
            <Input
              error={errors.image}
              id="image"
              type="file"
              accept="image/*"
              disabled={isPending} // isPending here
              {...register('image', {
                required: !isUpdate && true,
              })}
            />
          </div>
          <Button disabled={isPending} type="submit">
            {isUpdate ? 'Оновити' : 'Створити'}
          </Button>
        </form>
      )}
    </>
  );
};

export default PlaylistForm;
