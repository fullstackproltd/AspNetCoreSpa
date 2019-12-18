#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
# Setup NodeJs
RUN apt-get -qq update && \
    apt-get -qq install -y wget && \
    apt-get -qq install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get -qq install -y build-essential nodejs && \
    apt-get -qq install -y nginx
# End setup

WORKDIR /app

EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
# Setup NodeJs
RUN apt-get -qq update && \
    apt-get -qq install -y wget && \
    apt-get -qq install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get -qq install -y build-essential nodejs && \
    apt-get -qq install -y nginx
# End setup

WORKDIR /src
COPY ["src/AspNetCoreSpa.Web/AspNetCoreSpa.Web.csproj", "src/AspNetCoreSpa.Web/"]
COPY ["src/AspNetCoreSpa.Core/AspNetCoreSpa.Core.csproj", "src/AspNetCoreSpa.Core/"]
COPY ["src/AspNetCoreSpa.Infrastructure/AspNetCoreSpa.Infrastructure.csproj", "src/AspNetCoreSpa.Infrastructure/"]
RUN dotnet restore "src/AspNetCoreSpa.Web/AspNetCoreSpa.Web.csproj"
COPY ["src/AspNetCoreSpa.Web/ClientApp/package.json", "src/AspNetCoreSpa.Web/ClientApp/"]

RUN cd src/AspNetCoreSpa.Web/ClientApp \
    && npm i --silent

COPY . .
WORKDIR /src/src/AspNetCoreSpa.Web
RUN dotnet build "AspNetCoreSpa.Web.csproj" -c Release -o /app

FROM build AS publish

RUN dotnet publish "AspNetCoreSpa.Web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "AspNetCoreSpa.Web.dll"]