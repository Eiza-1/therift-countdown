<#
deploy.ps1 - Helper to initialize git and optionally create a GitHub repo using gh CLI.

Usage:
  .\deploy.ps1 [-CreateGhRepo]

If `gh` is installed and you pass `-CreateGhRepo`, the script will create a remote GitHub repo and push.
>#

param(
    [switch]$CreateGhRepo
)

Set-StrictMode -Version Latest
Push-Location (Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)

if (-not (Test-Path .git)) {
    git init
    git add .
    git commit -m "Initial commit: TheRift countdown app"
    Write-Output "Local git repository initialized and initial commit created."
} else {
    Write-Output "Git repository already exists locally."
}

if ($CreateGhRepo) {
    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
        Write-Error "GitHub CLI (gh) not found. Install it from https://cli.github.com/ and authenticate (gh auth login) first."
        Pop-Location
        exit 1
    }

    $repoName = Read-Host "Enter repo name (e.g. therift-countdown)"
    $visibility = Read-Host "Visibility (public/private) [public]"
    if ([string]::IsNullOrWhiteSpace($visibility)) { $visibility = 'public' }

    gh repo create $repoName --$visibility --source . --remote origin --push
    Write-Output "Created GitHub repo and pushed current branch."
}

Pop-Location