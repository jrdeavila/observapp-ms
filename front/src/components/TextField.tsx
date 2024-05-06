import { Input, InputProps } from "@nextui-org/react";
import { FieldAttributes, Field } from "formik";

const TextFormikField = ({
  placeholder,
  type,
  ...props
}: FieldAttributes<InputProps>) => {
  return (
    <Field
      {...props}
      className={`focus:outline-none focus:ring-0 focus:ring-none focus:border-none border-none outlined-none px-0 mx-0 ${props.className}`}
    >
      {({ field, form, meta }: any) => {
        return (
          <Input
            name={props.name}
            disabled={props.disabled}
            onChange={props.onChange}
            onBlur={props.onBlur}
            startContent={props.startContent}
            endContent={props.endContent}
            errorMessage={form.errors[field.name]}
            isInvalid={meta.touched && meta.error ? true : false}
            {...field}
            type={type}
            placeholder={placeholder}
            status={meta.touched && meta.error ? "error" : "default"}
            message={meta.touched && meta.error ? meta.error : ""}
            className="focus:outline-none focus:ring-0 focus:ring-none focus:border-none border-none outline-none mx-0 px-0"
          />
        );
      }}
    </Field>
  );
};

const TextField: React.FC<FieldAttributes<InputProps>> = (props) => {
  return <TextFormikField {...props} />;
};

export default TextField;
