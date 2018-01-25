$location = Get-Location | Select-Object $_.Path
$packOutput = Join-Path $location "bin\Release\netcoreapp2.0\publish"

$appName = "aspnetcorespa"

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
	# Build image
	& docker build -t $appName $packOutput
	# Login heroku container service
	& heroku container:login
	# Tag image to be deployed
	& docker tag $appName registry.heroku.com/$appName/web
	# Deploy to heroku container
	& docker push registry.heroku.com/$appName/web

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