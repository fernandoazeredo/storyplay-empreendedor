param(
  [string]$FirebaseProjectId = "storyplay-empreendedor"
)

$ErrorActionPreference = "Stop"

Write-Host "Validando acesso ao Firebase..." -ForegroundColor Cyan
firebase --version
firebase projects:list | Out-Null

Write-Host "Publicando somente o Firebase Hosting em '$FirebaseProjectId'..." -ForegroundColor Cyan
firebase use $FirebaseProjectId
firebase deploy --only hosting --project $FirebaseProjectId

Write-Host "Deploy concluido com sucesso." -ForegroundColor Green
Write-Host "URL final: https://$FirebaseProjectId.web.app" -ForegroundColor Green
