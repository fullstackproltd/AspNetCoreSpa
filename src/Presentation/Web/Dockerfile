#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
# Setup NodeJs
RUN apt-get -qq update && \
    apt-get -qq install -y wget && \
    apt-get -qq install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get -qq install -y build-essential nodejs && \
    apt-get -qq install -y nginx
# End setup

WORKDIR /app

EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
# Setup NodeJs
RUN apt-get -qq update && \
    apt-get -qq install -y wget && \
    apt-get -qq install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get -qq install -y build-essential nodejs && \
    apt-get -qq install -y nginx
# End setup

WORKDIR /src
COPY ["src/Presentation/Web/Web.csproj", "src/Presentation/Web/"]
COPY ["src/Infrastructure/Infrastructure/Infrastructure.csproj", "src/Infrastructure/Infrastructure/"]
COPY ["src/Core/Application/Application.csproj", "src/Core/Application/"]
COPY ["src/Core/Domain/Domain.csproj", "src/Core/Domain/"]
COPY ["src/Core/Common/Common.csproj", "src/Core/Common/"]
RUN dotnet restore "src/Presentation/Web/Web.csproj"
COPY ["src/Presentation/Web/ClientApp/package.json", "src/Presentation/Web/ClientApp/"]

RUN cd src/Presentation/Web/ClientApp \
    && npm i --silent

COPY . .
WORKDIR /src/src/Presentation/Web
RUN dotnet build "Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AspNetCoreSpa.Web.dll"]