#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app

# To avoid conflict with port 80 on some platforms
# https://github.com/aspnet/AspNetCore/issues/4699
EXPOSE 8080
ENV ASPNETCORE_URLS=http://*:8080
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["src/AspNetCoreSpa.STS/AspNetCoreSpa.STS.csproj", "src/AspNetCoreSpa.STS/"]
RUN dotnet restore "src/AspNetCoreSpa.STS/AspNetCoreSpa.STS.csproj"
COPY . .
WORKDIR /src/src/AspNetCoreSpa.STS
RUN dotnet build "AspNetCoreSpa.STS.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "AspNetCoreSpa.STS.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "AspNetCoreSpa.STS.dll"]