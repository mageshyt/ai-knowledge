import { addListener } from 'process';
import React, { FC } from 'react'


interface Props {
  name: string,
  age: number,
  email: string,
  address: string
}
export const test: FC<Props> = ({ name, age }) => {
  const info: string = `name is ${name} and age is ${age}`;

  return (
    <div className=''>
      {info}

    </div>
  )
}

