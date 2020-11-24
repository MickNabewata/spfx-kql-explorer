/** locフォルダ配下で定義したローカライズ用ファイルの型定義 */
declare interface ISpfxKqlExplorerWebPartStrings {
  /** タイトル入力フィールドのプレースホルダ */
  titlePlaceholder: string;
  /** ドロップダウンが空の場合に表示されるプレースホルダ */
  emptyDropDownPlaceholder: string;
  /** 検索クエリが空の場合に表示されるプレースホルダ */
  queryPlaceholder: string;
  /** コネクタのプレースホルダ */
  connectorPlaceholder: string;
  /** プロパティが空の場合に表示されるプレースホルダ */
  fieldPlaceholder: string;
  /** 検索先のラベル */
  entityTypeLabel: string;
  /** コネクタのラベル */
  connectorLabel: string;
  /** クエリのラベル */
  queryLabel: string;
  /** よく使うクエリのラベル */
  usefulQueryLabel: string;
  /** フィールドのラベル */
  fieldLabel: string;
  /** 追加ボタンのテキスト */
  addButtonText: string;
  /** 検索ボタンのテキスト */
  searchButtonText: string;
  /** 検索先選択肢 サイト */
  entityTypeOptionSite: string;
  /** 検索先選択肢 リスト */
  entityTypeOptionList: string;
  /** 検索先選択肢 ライブラリ */
  entityTypeOptionDrive: string;
  /** 検索先選択肢 リスト アイテム */
  entityTypeOptionListItem: string;
  /** 検索先選択肢 ドキュメント */
  entityTypeOptionDriveItem: string;
  /** 検索先選択肢 メール */
  entityTypeOptionMessage: string;
  /** 検索先選択肢 予定 */
  entityTypeOptionEvent: string;
  /** 検索先選択肢 外部アイテム */
  entityTypeOptionExternalItem: string;
  /** よく使うクエリ選択肢 サイト */
  usefulQueryOptionSites: string;
  /** よく使うクエリ選択肢 リストとライブラリ */
  usefulQueryOptionApps: string;
  /** よく使うクエリ選択肢 ニュース */
  usefulQueryOptionNews: string;
  /** よく使うクエリ選択肢 リスト アイテム */
  usefulQueryOptionListItems: string;
  /** よく使うクエリ選択肢 ドキュメント */
  usefulQueryOptionDocuments: string;
  /** よく使うクエリ選択肢 ひと */
  usefulQueryOptionPeople: string;
  /** 応答本文タブのラベル */
  responseBodyPivotLabel: string;
  /** 応答ヘッダタブのラベル */
  responseHeadersPivotLabel: string;
}

/** locフォルダ配下で定義したローカライズ用ファイルの読取結果 */
declare module 'SpfxKqlExplorerWebPartStrings' {  
  const strings: ISpfxKqlExplorerWebPartStrings;
  export = strings;
}
