FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y build-essential nodejs
# End setup

WORKDIR /app
EXPOSE 5001

FROM microsoft/dotnet:2.1-sdk AS build
# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y build-essential nodejs
# End setup

WORKDIR /src
COPY ["src/AspNetCoreSpa.Web/AspNetCoreSpa.Web.csproj", "src/AspNetCoreSpa.Web/"]
COPY ["src/AspNetCoreSpa.Core/AspNetCoreSpa.Core.csproj", "src/AspNetCoreSpa.Core/"]
COPY ["src/AspNetCoreSpa.Infrastructure/AspNetCoreSpa.Infrastructure.csproj", "src/AspNetCoreSpa.Infrastructure/"]
RUN dotnet restore "src/AspNetCoreSpa.Web/AspNetCoreSpa.Web.csproj"
COPY ["src/AspNetCoreSpa.Web/ClientApp/package.json", "src/AspNetCoreSpa.Web/ClientApp/"]
#RUN npm i -g yarn
RUN cd src/AspNetCoreSpa.Web/ClientApp \
    && npm i

COPY . .
WORKDIR "/src/src/AspNetCoreSpa.Web"
RUN dotnet build "AspNetCoreSpa.Web.csproj" -c Release -o /app

FROM build AS publish
WORKDIR "/src/src/AspNetCoreSpa.Web/ClientApp"
RUN npm rebuild node-sass --force

RUN dotnet publish "AspNetCoreSpa.Web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "AspNetCoreSpa.Web.dll"]