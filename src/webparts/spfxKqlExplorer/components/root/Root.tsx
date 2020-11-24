import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import styles from './Root.module.scss';
import { titlePlaceholder, queryPlaceholder, emptyDropDownPlaceholder, fieldPlaceholder, queryLabel, usefulQueryLabel, fieldLabel, usefulQueryOptionSites, usefulQueryOptionApps, usefulQueryOptionNews, usefulQueryOptionListItems, usefulQueryOptionDocuments, usefulQueryOptionPeople, addButtonText, searchButtonText, entityTypeOptionSite, entityTypeOptionList, entityTypeOptionDrive, entityTypeOptionDriveItem, entityTypeOptionListItem, entityTypeOptionMessage, entityTypeOptionEvent, entityTypeOptionExternalItem, entityTypeLabel, connectorLabel, connectorPlaceholder } from 'SpfxKqlExplorerWebPartStrings';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { TextField, Stack, IDropdownOption, Dropdown, DefaultButton } from 'office-ui-fabric-react';
import Response from '../response/Response';
import Chip from '@material-ui/core/Chip';
import { EntityType, ISearchResults } from '../../../../datas/search/search';

/** ルートコンポーネント プロパティ */
export interface IRootProps {
  /** タイトル */
  title: string;
  /** 表示モード */
  mode: DisplayMode;
  /** タイトル変更イベント */
  titleChanged: (title: string) => void;
  /** 実行処理 */
  onExecute: (entityTypes: EntityType[], query: string, fields?: string[], contentSources?: string[]) => Promise<ISearchResults>;
}

/** よく使う条件 選択肢 */
const usefulQueryOptions: IDropdownOption[] = [
  { text: usefulQueryOptionSites, key: 'sites', data: 'contentclass:STS_Web' },
  { text: usefulQueryOptionApps, key: 'apps', data: '(contentclass:STS_List OR contentclass:STS_List_DocumentLibrary)' },
  { text: usefulQueryOptionNews, key: 'news', data: 'PromotedState=2' },
  { text: usefulQueryOptionListItems, key: 'listitems', data: 'contentclass:STS_ListItem' },
  { text: usefulQueryOptionDocuments, key: 'documents', data: 'IsDocument:True' },
  { text: usefulQueryOptionPeople, key: 'people', data: 'ContentClass=urn:content-class:SPSPeople' }
];

/** 検索先 選択肢 */
const entityTypeOptions: IDropdownOption[] = [
  { text: entityTypeOptionSite, key: 'site', data: 'site' },
  { text: entityTypeOptionList, key: 'list', data: 'list' },
  { text: entityTypeOptionDrive, key: 'drive', data: 'drive' },
  { text: entityTypeOptionListItem, key: 'listItem', data: 'listItem' },
  { text: entityTypeOptionDriveItem, key: 'driveItem', data: 'driveItem' },
  { text: entityTypeOptionMessage, key: 'message', data: 'message' },
  { text: entityTypeOptionEvent, key: 'event', data: 'event' },
  { text: entityTypeOptionExternalItem, key: 'externalItem', data: 'externalItem' },
];

/** ルートコンポーネント */
export default function Root(props: IRootProps): JSX.Element {
  if(isEmpty(props)) return undefined;
  const [executing, setExecuting] = React.useState<boolean>(false);
  const [entityType, setEntityType] = React.useState<IDropdownOption>();
  const [contentSource, setContentSource] = React.useState<string>('');
  const [query, setQuery] = React.useState<string>('');
  const [usefulQuery, setUsefulQuery] = React.useState<IDropdownOption>();
  const [field, setField] = React.useState<string>('');
  const [fields, setFields] = React.useState<string[]>();
  const [response, setResponse] = React.useState<ISearchResults>();
  const [error, setError] = React.useState<Error>();
  
  return (
    <div className={styles.root}>
      <div className={(props.mode === DisplayMode.Edit) ? `${styles.container} ${styles.containerEdit}` : styles.container}>
        { /** タイトル領域 */ }
        <div className={styles.titleArea}>
          {
            props.mode === DisplayMode.Read ?
              isEmpty(props.title) ? undefined: <p className={styles.title}>{props.title}</p> :
              <TextField
                borderless 
                placeholder={titlePlaceholder}
                value={props.title}
                className={styles.titleInput}
                onChange={(e, v) => { if(props.titleChanged) props.titleChanged(v); }}
                disabled={executing}
              />
          }
        </div>
        { /** コンテンツ領域 */ }
        <div>
          <Stack tokens={{ childrenGap: 10 }} >
            { /** 検索対象 */ }
            <Stack horizontal verticalAlign='end' tokens={{ childrenGap: 10 }}>
              <Dropdown
                label={entityTypeLabel}
                placeholder={emptyDropDownPlaceholder}
                options={entityTypeOptions}
                selectedKey={entityType ? entityType.key : ''}
                onChange={(e, o, i) => { setEntityType(o); }}
                disabled={executing}
                className={styles.narrow}
              />
            </Stack>
            { /** コネクタ */ }
            {
              entityType && entityType.data === 'externalItem' ?
                <TextField
                  label={connectorLabel}
                  placeholder={connectorPlaceholder}
                  value={contentSource}
                  onChange={(e, v) => { setContentSource(v); }}
                  prefix='/external/connections/'
                  disabled={executing}
                /> :
                undefined
            }
            { /** クエリ */ }
            <TextField
              label={queryLabel}
              placeholder={queryPlaceholder}
              value={query}
              onChange={(e, v) => { setQuery(v); }}
              multiline
              disabled={executing}
            />
            { /** よく使う条件 */ }
            <Stack horizontal verticalAlign='end' tokens={{ childrenGap: 10 }} >
              <Dropdown
                label={usefulQueryLabel}
                placeholder={emptyDropDownPlaceholder}
                options={usefulQueryOptions}
                selectedKey={usefulQuery ? usefulQuery.key : ''}
                onChange={(e, o, i) => { setUsefulQuery(o); }}
                disabled={executing}
                className={styles.narrow}
              />
              <DefaultButton
                text={addButtonText}
                onClick={() => {
                  if(usefulQuery) {
                    setQuery(query ? `${query} ${usefulQuery.data}` : usefulQuery.data);
                    setUsefulQuery(undefined);
                  }
                }}
                disabled={executing || !usefulQuery}
              />
            </Stack>
            { /** 取得する管理プロパティ */ }
            <Stack tokens={{ childrenGap: 5 }} >
              <Stack horizontal verticalAlign='end' tokens={{ childrenGap: 10 }}>
                <TextField
                  label={fieldLabel}
                  placeholder={fieldPlaceholder}
                  value={field}
                  onChange={(e, v) => { setField(v); }}
                  disabled={executing}
                  className={styles.narrow}
                />
                <DefaultButton
                  text={addButtonText}
                  onClick={() => {
                    if(field) {
                      const currentFields: string[] = fields ? JSON.parse(JSON.stringify(fields)) : [];
                      currentFields.push(field);
                      setFields(currentFields);
                      setField('');
                    }
                  }}
                  disabled={executing || !field}
                />
              </Stack>
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                {
                  fields ? 
                    fields.map((p, i) => {
                      return (
                        <Chip
                          label={p}
                          onDelete={() => {
                            const currentFields: string[] = JSON.parse(JSON.stringify(fields));
                            currentFields.splice(i, 1);
                            setFields(currentFields);
                          }}
                          variant='outlined'
                          key={`spfx-kql-explorer-field-${i}`}
                        />
                      );
                    }) : 
                    undefined
                }
              </Stack>
            </Stack>
            { /** 検索ボタン */ }
            <span>
              <DefaultButton
                text={searchButtonText}
                onClick={async () => {
                  if(props.onExecute && query) {
                    try {
                      setExecuting(true);
                      setResponse(undefined);
                      setError(undefined);
                      
                      setResponse(await props.onExecute(
                        entityType ? [entityType.data] : [], 
                        query, 
                        fields, 
                        entityType && entityType.data === 'externalItem' && contentSource ? [contentSource] : undefined));
                      
                      setExecuting(false);
                    } catch(ex) {
                      setError(ex);
                      setExecuting(false);
                    }
                  }
                }}
                disabled={executing || !entityType || !query || entityType && entityType.data === 'externalItem' && !contentSource}
              />
            </span>
            { /** 検索結果 */ }
            <Response response={response} error={error} />
          </Stack>
        </div>
      </div>
    </div>
  );
}