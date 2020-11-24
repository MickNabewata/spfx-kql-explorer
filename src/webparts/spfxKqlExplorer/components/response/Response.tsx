import * as React from 'react';
import styles from './Response.module.scss';
import { responseBodyPivotLabel, responseHeadersPivotLabel } from 'SpfxKqlExplorerWebPartStrings';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { Text, Pivot, PivotItem, TextField } from 'office-ui-fabric-react';
import Card from '../card/Card';
import { ISearchResults } from '../../../../datas/search/search';

/** 応答コンポーネント プロパティ(正常) */
export interface IResponseProps {
    /** 応答 */
    response: ISearchResults;
    /** エラー */
    error: Error;
}

/** 応答コンポーネント */
export default function Response(props: IResponseProps): JSX.Element {
    if(isEmpty(props)) return undefined;
    const [ body, setBody ] = React.useState<string>('');
    const [ header, setHeader ] = React.useState<string>('');
    const [ error, setError ] = React.useState<Error>(props.error);

    // コンポーネント描画完了 および 更新処理
    React.useEffect(() => {
        let unmounted = false;

        if(!unmounted) {
            setError(props.error);
            retriveResponseHeaders(props.response).then(
                (retrivedHeader) => {
                    setHeader(retrivedHeader);
                },
                (ex) => {
                    setError(ex);
                }
            );
            retriveResponse(props.response).then(
                (retrivedBody) => {
                    setBody(retrivedBody);
                },
                (ex) => {
                    setError(ex);
                }
            );
        }

        return () => { unmounted = true; };
    }, [ props ]);

    return (
        <Card className={styles.response}>
            {
                !error ?
                    <Pivot>
                        { /** 応答本文タブ */ }
                        <PivotItem headerText={responseBodyPivotLabel} itemIcon='Reply' className={styles.tabContent}>
                            <TextField
                                value={body}
                                readOnly
                                multiline
                                autoAdjustHeight
                            />
                        </PivotItem>
                        { /** 応答ヘッダタブ */ }
                        <PivotItem headerText={responseHeadersPivotLabel} itemIcon='FileComment' className={styles.tabContent}>
                            <TextField
                                value={header}
                                readOnly
                                multiline
                                autoAdjustHeight
                            />
                        </PivotItem>
                    </Pivot> :
                    <Text variant='medium' className={styles.error}>{error ? error.message : ''}</Text>
            }
        </Card>
    );
}

/** 応答本文の読み取り */
async function retriveResponse(response: ISearchResults): Promise<string> {
    try {
        if(!response || !response.body) return '';

        return JSON.stringify(response.body, null, '\t');
    } catch(ex) {
        return Promise.reject(ex);
    }
}

/** 応答ヘッダの読み取り */
async function retriveResponseHeaders(response: ISearchResults): Promise<string> {
    try {
        if(!response || !response.headers) return '';

        const headers = {};
        response.headers.forEach((key, value) => {
            headers[key] = value;
        });

        return JSON.stringify(headers, null, '\t');
    } catch(ex) {
        return Promise.reject(ex);
    }
}