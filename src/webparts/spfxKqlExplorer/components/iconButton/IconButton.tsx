import * as React from 'react';
import { IconButton as OriginalIconButton, IButtonProps } from 'office-ui-fabric-react';
import styles from './IconButton.module.scss';

/** スタイル付きボタン */
export default function IconButton(props: IButtonProps) {
    return <OriginalIconButton {...props} className={`${styles.iconButton}${props.className ? ` ${props.className}` : ''}`} />;
}