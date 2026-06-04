import Input from '../atoms/Input';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '../atoms/Button';
import type { Track } from '@/types';

import Select from './SelectGenre';
import { GENRES } from '@/lib/const';

type Props = {
  isUpdate?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  isPending: boolean;
  track?: Track;
};

const TrackFormFields = ({ isUpdate, onSubmit, isPending, track }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    values: {
      title: isUpdate ? track?.title : '',
      author: isUpdate ? track?.author : '',
      genre: isUpdate ? track?.genre : '',
    },
  });

  if (isUpdate && !track) {
    return (
      <h2 className="text-[2rem] text-primary text-center">
        Не вдалося знайти трек
      </h2>
    );
  }

  return (
    <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        error={errors.title}
        id="title"
        placeholder={!errors.title ? 'Введіть назву' : "Назва обов'язкова"}
        {...register('title', {
          required: true,
        })}
        disabled={isPending} // isPending here
      />
      <Input
        error={errors.author}
        id="author"
        placeholder={!errors.author ? 'Введіть автора' : "Автор обов'язковий"}
        {...register('author', {
          required: true,
        })}
        disabled={isPending} // isPending here
      />

      <div className="flex flex-col gap-y-1">
        <Controller
          name="genre"
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={isUpdate ? track?.genre : ''}
          render={({ field }) => {
            return (
              <Select
                options={GENRES}
                value={field.value}
                onChange={field.onChange}
                placeholder={
                  !errors.genre ? 'Виберіть жанр' : "Жанр обов'язковий"
                }
                disabled={isPending}
                error={!!errors.genre}
              />
            );
          }}
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <span>{`Завантажити обкладинку ${isUpdate ? "(необов'язково)" : "(обов'язково)"}`}</span>

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
      {!isUpdate && (
        <div className="flex flex-col gap-y-1">
          <span>{`Завантажити аудіо ${isUpdate ? "(необов'язково)" : "(обов'язково)"}`}</span>
          <Input
            error={errors.track}
            id="track"
            type="file"
            accept=".mp3"
            disabled={isPending} // isPending here
            {...register('track', {
              required: true,
            })}
          />
        </div>
      )}
      <Button disabled={isPending} type="submit">
        {isUpdate ? 'Оновити' : 'Створити'}
      </Button>
    </form>
  );
};

export default TrackFormFields;
