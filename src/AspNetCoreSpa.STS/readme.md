# Migrations for identity server

	1. dotnet ef migrations add InitialIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o Data/Migrations/IdentityServer/PersistedGrantDb
	2. dotnet ef migrations add InitialIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o Data/Migrations/IdentityServer/ConfigurationDb
	3. dotnet ef migrations add InitialAspNetIdentityDbMigration -c ApplicationDbContext -o Data/Migrations/IdentityDb
