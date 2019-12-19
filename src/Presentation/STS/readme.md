# Migrations for identity server

	1. dotnet ef migrations add InitialIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o Data/Migrations/IdentityServer/PersistedGrantDb
	2. dotnet ef migrations add InitialIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o Data/Migrations/IdentityServer/ConfigurationDb
	3. dotnet ef migrations add InitialAspNetIdentityDbMigration -c ApplicationDbContext -o Data/Migrations/IdentityDb


# Install EF Core 3.1 global tools
dotnet tool install --global dotnet-ef

# Identity server migrations
from root of the project
## Create Migration
dotnet ef migrations add migrationname --startup-project ./src/Presentation/STS --project ./src/Infrastructure/Infrastructure --context IdentityServerDbContext -o Identity/Migrations
## Update database
 dotnet ef database update  --startup-project ./src/Presentation/STS --project ./src/Infrastructure/Infrastructure --context IdentityServerDbContext
## Drop database
 dotnet ef database drop  --startup-project ./src/Presentation/STS --project ./src/Infrastructure/Infrastructure --context IdentityServerDbContext
# Package Manager Console
set Infrastructure as default project and STS as startup project
Add-Migration migrationname -context IdentityServerDbContext -o Identity/Migrations