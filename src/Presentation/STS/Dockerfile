#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/Presentation/STS/STS.csproj", "src/Presentation/STS/"]
COPY ["src/Infrastructure/Infrastructure/Infrastructure.csproj", "src/Infrastructure/Infrastructure/"]
COPY ["src/Core/Application/Application.csproj", "src/Core/Application/"]
COPY ["src/Core/Domain/Domain.csproj", "src/Core/Domain/"]
COPY ["src/Core/Common/Common.csproj", "src/Core/Common/"]
RUN dotnet restore "src/Presentation/STS/STS.csproj"
COPY . .
WORKDIR /src/src/Presentation/STS
RUN dotnet build "STS.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "STS.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AspNetCoreSpa.STS.dll"]