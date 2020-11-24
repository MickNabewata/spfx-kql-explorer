import * as React from 'react';
import * as ReactDom from 'react-dom';
import { update } from '@microsoft/sp-lodash-subset';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SpfxKqlExplorerWebPartStrings';
import Root, { IRootProps } from './components/root/Root';
import { search, EntityType, ISearchResults } from '../../datas/search/search';

/** マニフェストで定義したプロパティの型定義 */
export interface ISpfxKqlExplorerWebPartProps {
  /** タイトル */
  title: string;
}

/** Dataflex Pro エクスプローラー Webパーツ */
export default class SpfxKqlExplorerWebPart extends BaseClientSideWebPart<ISpfxKqlExplorerWebPartProps> {

  /** 描画 */
  public render(): void {
    const element: React.ReactElement<IRootProps> = React.createElement(
      Root,
      {
        title: this.properties.title,
        mode: this.displayMode,
        titleChanged: this.titleChanged.bind(this),
        onExecute: this.onExecute.bind(this)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /** Webパーツのタイトル変更イベント */
  private titleChanged(title: string) {
    update(this.properties, 'title', (): any => { return title; });
  }

  /** 実行処理 */
  private async onExecute(entityTypes: EntityType[], query: string, fields?: string[], contentSources?: string[]): Promise<ISearchResults> {
    return await search({
      client: await this.context.msGraphClientFactory.getClient(),
      entityTypes: entityTypes,
      contentSources: contentSources ? 
        contentSources.map((contentSource) => {
          return `/external/connections/${contentSource}`;
        }) : 
        undefined,
      query: query,
      fields: fields ? fields : undefined
    });
  }

  /** プロパティウィンドウ定義 */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }

  /** Webパーツ破棄イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}