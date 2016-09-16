 # bootstrap DNVM into this session.
 &{$Branch='dev';iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}

 # load global.json to find the DNX version.
 $globalJson = Get-Content -Path $PSScriptRoot\global.json -Raw -ErrorAction Ignore | ConvertFrom-Json -ErrorAction Ignore

 if($globalJson)
 {
     $dnxVersion = $globalJson.sdk.version
 }
 else
 {
     Write-Warning "Unable to locate global.json to determine using 'latest'"
     $dnxVersion = "latest"
 }

 # install DNX.
 # installs only the default (x86, clr) runtime of the framework.
 # if you need additional architectures or runtimes, add additional calls,
 # for example: & $env:USERPROFILE\.dnx\bin\dnvm install $dnxVersion -r coreclr
 & $env:USERPROFILE\.dnx\bin\dnvm install $dnxVersion -Persistent

 # run DNU restore on all project.json files in the src folder 
 # including 2>1 to redirect stderr to stdout for badly behaved tools.
 Get-ChildItem -Path $PSScriptRoot\src -Filter project.json -Recurse | ForEach-Object { & dnu restore $_.FullName 2>1 }