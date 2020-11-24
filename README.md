# spfx-kql-explorer

[for English](https://github.com/MickNabewata/spfx-kql-explorer/blob/master/README_EN.md)

## 概要

Graph APIのsearchエンドポイントを利用した検索処理をテストするためのツールです。   
サンプルのリクエストもいくつか含まれています。

![画面イメージ](https://github.com/MickNabewata/spfx-kql-explorer/blob/images/jp/1.png)

## SharePoint Frameworkバージョン

![バージョン](https://img.shields.io/badge/version-1.11-green.svg)

## 動作確認方法

- このリポジトリをクローンします。
- コマンドプロンプトを起動し、クローンしたリポジトリのフォルダに移動します。
- 以下コマンドを実行します。
  - **npm install**
  - **gulp serve**

## インストール方法

1. このリポジトリをクローンします。
1. コマンドプロンプトを起動し、クローンしたリポジトリのフォルダに移動します。
1. 以下コマンドを実行します。
  - **npm install**
  - **npm run package**
1. SharePointのアプリカタログにspfx-kql-explorer.sppkgをアップロードします。(**npm run package**を実行するとSharePointフォルダ内に作成されます。)   
1. 任意のSharePointサイトで「spfx-kql-explorer」のアプリを追加します。   
1. サイト内の任意のページで「KQL エクスプローラー」Webパーツを追加します。

## 機能

- Graph APIへのリクエスト実行

検索対象、クエリ、フィールドを指定してWeb APIを実行します。   
外部アイテムを検索する際はコネクタ名も指定します。

![画面イメージ](https://github.com/MickNabewata/spfx-kql-explorer/blob/images/jp/1.png)

## 免責事項

**このコードは、明示または黙示を問わず、特定の目的への適合性、商品性、または非侵害の黙示の保証を含め、いかなる種類の保証もなしに*現状のまま*提供されます。**