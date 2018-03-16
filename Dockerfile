FROM microsoft/aspnetcore:2.1.0-preview1
WORKDIR /app
COPY . .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet AspNetCoreSpa.dll
