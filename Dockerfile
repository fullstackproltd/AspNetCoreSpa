FROM microsoft/dotnet-nightly:2.1-sdk AS build-env
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj ./
COPY NuGet.config ./
RUN dotnet restore

RUN apt-get -qq update && apt-get -qqy --no-install-recommends install wget gnupg \
    git \
    unzip
    
RUN curl -sL https://deb.nodesource.com/setup_8.x |  bash -
RUN apt-get install -y nodejs

# copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out --no-restore


# build runtime image
FROM microsoft/dotnet-nightly:2.1-runtime-alpine
WORKDIR /app
COPY --from=build-env /app/out ./
ENTRYPOINT ["dotnet", "AspNetCoreSpa.dll"]