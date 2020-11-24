import { EnvironmentType, Environment } from '@microsoft/sp-core-library';
import { searchTest } from './test';
import { searchGraph } from './graph';
import { MSGraphClient } from '@microsoft/sp-http';

/** 検索条件 */
export interface ISearchOptions {
    /** Graph API実行クライアント */
    client: MSGraphClient;
    /** データ型 */
    entityTypes: EntityType[];
    /** コンテンツ ソース */
    contentSources?: string[];
    /** 検索クエリ */
    query: string;
    /** 取得対象フィールド一覧 */
    fields?: string[];
}

/**データ型 選択肢 */
export type EntityType =  'site' | 'list' | 'drive' | 'listItem' | 'driveItem' | 'message' | 'event' |'externalItem';

/** 検索結果 */
export interface ISearchResults {
    /** 応答ヘッダ(HttpClientResponse型 Headersプロパティ) */
    headers: any;
    /** 応答本文 */
    body: any;
}

/** 検索 */
export async function search(options: ISearchOptions): Promise<ISearchResults> {
    if(options.client) {
        switch(Environment.type) {
            case EnvironmentType.SharePoint:
                return searchGraph(options);
            default:
                return searchTest(options);
        }
    } else {
        return searchTest(options);
    }
}