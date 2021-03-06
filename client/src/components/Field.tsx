import React from "react"
import { BiError } from "react-icons/bi"
import "../styles/field.scss"

interface IFieldProps {
  disableError?: boolean
  field: {
    placeholder?: string
    param: string
    type?: string
    value: string
    title?: string
    msg?: string
    important?: boolean
  }
  change: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined
  exClass?: string
}

const Field: React.FC<IFieldProps> = ({
  field,
  change,
  exClass,
  disableError = false,
}) => {
  return (
    <label className={`field ${exClass}`} key={field.param}>
      {field.title && (
        <span
          className={`field__title ${
            field.important && "field__title--important"
          }`}>
          {field.title}
        </span>
      )}
      <input
        className={`field__input ${field.msg?.length && "field__input--error"}`}
        type={field.type}
        name={field.param}
        value={field.value}
        onChange={change}
        autoComplete='off'
        placeholder={field.placeholder?.length ? field.placeholder : ""}
      />
      {!disableError && (
        <span
          className={`field__error ${
            field.msg?.length && "field__error--active"
          }`}>
          <BiError className='field__error-icon' /> <span>{field.msg}</span>
        </span>
      )}
    </label>
  )
}

export default Field
