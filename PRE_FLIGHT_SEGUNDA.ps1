$ErrorActionPreference = 'Stop'

$repo = 'D:\APLICATIVOS - DEPLOY\storyplay-empreendedor-main'
$url = 'https://storyplay-empreendedor.web.app'
$expectedCommit = '07d37eb'
$requiredAssets = @(
    '/',
    '/app.js',
    '/styles.css',
    '/qa-phase4.js',
    '/profile-view.js',
    '/ranking-events.js',
    '/classroom-v2.js',
    '/tax-choice.js',
    '/advanced-finance.js',
    '/advanced-logistics.js',
    '/advanced-admin.js',
    '/advanced-people.js',
    '/advanced-marketing.js'
)

Write-Host '=== STORYPLAY EMPREENDEDOR - PRE-FLIGHT DE ENTREGA ===' -ForegroundColor Cyan

if (-not (Test-Path $repo)) {
    throw "Pasta local nao encontrada: $repo"
}

Set-Location $repo

$branch = (git branch --show-current).Trim()
$commit = (git rev-parse --short HEAD).Trim()
$status = git status --porcelain

Write-Host "Branch local: $branch"
Write-Host "Commit local: $commit"

if ($branch -ne 'main') {
    Write-Warning "Branch atual nao e main. Para a apresentacao, use a main homologada."
}

if (-not $commit.StartsWith($expectedCommit)) {
    Write-Warning "Commit local diferente do commit homologado $expectedCommit."
} else {
    Write-Host 'Commit homologado confirmado.' -ForegroundColor Green
}

if ($status) {
    Write-Warning 'Existem alteracoes locais nao commitadas. Nao faca deploy antes de revisar.'
    git status --short
} else {
    Write-Host 'Working tree limpo.' -ForegroundColor Green
}

Write-Host ''
Write-Host 'Testando site e assets publicados...' -ForegroundColor Cyan

$failures = @()
foreach ($asset in $requiredAssets) {
    $target = if ($asset -eq '/') { $url } else { "$url$asset" }
    try {
        $response = Invoke-WebRequest -Uri $target -Method Head -MaximumRedirection 5 -UseBasicParsing -TimeoutSec 20
        $code = [int]$response.StatusCode
        if ($code -ge 200 -and $code -lt 400) {
            Write-Host "OK  $code  $target" -ForegroundColor Green
        } else {
            Write-Host "ERRO $code  $target" -ForegroundColor Red
            $failures += "$code $target"
        }
    } catch {
        Write-Host "ERRO     $target - $($_.Exception.Message)" -ForegroundColor Red
        $failures += "$target - $($_.Exception.Message)"
    }
}

Write-Host ''
if ($failures.Count -eq 0) {
    Write-Host 'PRE-FLIGHT APROVADO: site acessivel, assets principais respondendo e versao local verificada.' -ForegroundColor Green
    Write-Host 'Nao faca novo deploy sem necessidade.' -ForegroundColor Yellow
    exit 0
}

Write-Host 'PRE-FLIGHT REPROVADO. Nao altere a producao antes de identificar a causa.' -ForegroundColor Red
$failures | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
exit 1
