$webdeploy = "C:\Program Files (x86)\IIS\Microsoft Web Deploy V3\msdeploy.exe"
$location = Get-Location | Select-Object $_.Path
$packOutput = Join-Path $location "bin\Release\netcoreapp2.1\publish"
$app_offline = Join-Path $location "app_offline.htm"

$iisApp = "aspnetcorespa"
$computerName = "https://aspnetcorespa.scm.azurewebsites.net/msdeploy.axd"
$username = "\`$aspnetcorespa"
$password = "your password here"

function DeletePublishFolder()
{
	if (Test-Path $packOutput)
	{
		WriteInfo "Removing publish folder..."
		Remove-Item -Force -Recurse $packOutput
	}
}

function Publish()
{
	dotnet publish -c Release
	WriteSuccess "Published!"
}

function Deploy()
{
	# Deploy app_offline file
	& $webdeploy -verb:sync -source:contentPath=$app_offline -dest:contentPath=$iisApp/app_offline.htm,ComputerName=$computerName,UserName=$username,Password=$password,IncludeAcls="False",AuthType="Basic" -retryAttempts:5 -allowUntrusted
	# Delete wwwroot folder
	& $webdeploy -verb:delete -dest:contentPath=$iisApp/wwwroot,ComputerName=$computerName,UserName=$username,Password=$password,IncludeAcls="False",AuthType="Basic" -retryAttempts:5 -allowUntrusted
	# Deploy published folder
	& $webdeploy -verb:sync -source:IisApp=$packOutput -dest:IisApp=$iisApp,ComputerName=$computerName,UserName=$username,Password=$password,IncludeAcls="False",AuthType="Basic" -enableRule:DoNotDeleteRule -disablerule:BackupRule -enableLink:contentLibExtension -retryAttempts:5 -allowUntrusted
	# Delete app_offline file
	& $webdeploy -verb:delete -dest:contentPath=$iisApp/app_offline.htm,ComputerName=$computerName,UserName=$username,Password=$password,IncludeAcls="False",AuthType="Basic" -retryAttempts:5 -allowUntrusted

	if ($LASTEXITCODE -ne 0)
	{
		WriteFailed "Failed with code $LASTEXITCODE. Exiting..."
		Exit
	}

	WriteSuccess "Deployment succeeded!"
}

function WriteFailed($text)
{
	Write-Host $text -ForegroundColor Red
}

function WriteInfo($text)
{
	Write-Host $text -ForegroundColor Cyan
}

function WriteSuccess($text)
{
	Write-Host $text -ForegroundColor Green
}

# -----------

DeletePublishFolder
Publish
Deploy