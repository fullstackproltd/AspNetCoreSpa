FROM microsoft/dotnet:3.0-aspnetcore-runtime AS base
# Setup NodeJs
RUN apt-get update -qq && \
    apt-get install -qq -y wget && \
    apt-get install -qq -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -qq -y build-essential nodejs && \
    apt-get install -qq -y nginx
# End setup

WORKDIR /app

EXPOSE 5005

FROM microsoft/dotnet:3.0-sdk AS build
# Setup NodeJs
RUN apt-get update -qq && \
    apt-get install -qq -y wget && \
    apt-get install -qq -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -qq -y build-essential nodejs && \
    apt-get install -qq -y nginx
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
WORKDIR "/src/src/AspNetCoreSpa.Web"
RUN dotnet build "AspNetCoreSpa.Web.csproj" -c Release -o /app

FROM build AS publish

RUN dotnet publish "AspNetCoreSpa.Web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "AspNetCoreSpa.Web.dll"]