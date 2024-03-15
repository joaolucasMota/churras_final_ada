import {FieldError} from 'react-hook-form';

interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  register: any;
  name: string;
  error: FieldError | undefined;
}

const Input = ({register, name, error, ...rest}: IProps) => {
  return (
    <>
      <input
        {...rest}
        {...register(name)}
      />
      {error && (
        <p>{error?.message}</p>

      )}
    </>
  )
}

export {Input};