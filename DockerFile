# ベースイメージとしてNode.jsを使用
FROM node:18-alpine

# 作業ディレクトリを作成
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存パッケージをインストール
RUN npm install --production

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションを実行するポートを指定
EXPOSE 3000

# アプリケーションのエントリーポイント
CMD ["npm", "start"]
