import * as React from 'react';
import styles from './Card.module.scss';
import { isEmpty } from '@microsoft/sp-lodash-subset';

/** カードコンポーネント プロパティ */
export interface ICardProps extends React.HTMLProps<HTMLDivElement> {
}

/** カードコンポーネント */
export default function Card(props: ICardProps): JSX.Element {
  return (
    <div {...props} className={`${!isEmpty(props.className) ? `${props.className} ` : ''}${styles.card}`} />
  );
}