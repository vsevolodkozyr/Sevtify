import Input from '../atoms/Input';

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ onChange, ...props }: Props) => {
  return (
    <Input
      onChange={onChange}
      id="search"
      placeholder="Enter title or author"
      className={`
    bg-neutral-800
      border-neutral-700
    `}
      {...props}
    />
  );
};

export default Search;
