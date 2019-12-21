@ECHO OFF
CLS
del /S *.db

FOR /d /r . %%d IN ("Migrations") DO @IF EXIST "%%d" rd /s /q "%%d"

dotnet ef migrations add Initial --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context ApplicationDbContext -o Persistence/Migrations
dotnet ef database update  --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context ApplicationDbContext

dotnet ef migrations add Initial --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context LocalizationDbContext -o Localization/Migrations
dotnet ef database update  --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context LocalizationDbContext

dotnet ef migrations add Initial --startup-project ./src/Presentation/STS --project ./src/Infrastructure/Infrastructure --context IdentityServerDbContext -o Identity/Migrations
dotnet ef database update  --startup-project ./src/Presentation/STS --project ./src/Infrastructure/Infrastructure --context IdentityServerDbContext

