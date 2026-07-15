Add-Type -AssemblyName System.Drawing

Update-TypeData -TypeName System.Drawing.Graphics -MemberType ScriptMethod -MemberName FillRoundedRectangle -Value {
    param($brush, $rect, $radius)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $radius * 2
    $path.AddArc($rect.X, $rect.Y, $diameter, $diameter, 180, 90)
    $path.AddArc($rect.Right - $diameter, $rect.Y, $diameter, $diameter, 270, 90)
    $path.AddArc($rect.Right - $diameter, $rect.Bottom - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc($rect.X, $rect.Bottom - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()
    $this.FillPath($brush, $path)
    $path.Dispose()
} -Force

$root = Join-Path $PSScriptRoot "..\\docs\\assets\\images\\social"
New-Item -ItemType Directory -Force -Path $root | Out-Null

function New-SocialCard {
    param(
        [string]$Path,
        [string]$Accent,
        [string]$Title,
        [string]$Subtitle,
        [string]$Badge
    )

    $width = 1200
    $height = 630
    $bitmap = New-Object System.Drawing.Bitmap $width, $height
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $rect = New-Object System.Drawing.Rectangle 0, 0, $width, $height
    $bgStart = [System.Drawing.Color]::FromArgb(255, 8, 12, 26)
    $bgEnd = [System.Drawing.Color]::FromArgb(255, 18, 28, 46)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $bgStart, $bgEnd, 25
    $graphics.FillRectangle($brush, $rect)

    $accentColor = [System.Drawing.ColorTranslator]::FromHtml($Accent)
    $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(34, $accentColor.R, $accentColor.G, $accentColor.B))
    $graphics.FillEllipse($glowBrush, 760, -40, 420, 420)
    $graphics.FillEllipse($glowBrush, -120, 340, 420, 420)

    $panelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230, 13, 19, 34))
    $graphics.FillRectangle($panelBrush, 58, 52, 1084, 526)

    $gridPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(36, 255, 255, 255), 1)
    foreach ($x in 0..8) {
        $graphics.DrawLine($gridPen, 70 + ($x * 120), 52, 70 + ($x * 120), 578)
    }
    foreach ($y in 0..4) {
        $graphics.DrawLine($gridPen, 58, 70 + ($y * 120), 1142, 70 + ($y * 120))
    }

    $chipBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, $accentColor.R, $accentColor.G, $accentColor.B))
    $graphics.FillRoundedRectangle($chipBrush, (New-Object System.Drawing.RectangleF 92, 88, 250, 46), 18)

    $whiteBrush = [System.Drawing.Brushes]::White
    $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(228, 192, 203, 221))
    $softBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180, 146, 162, 187))
    $codeBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 10, 14, 24))
    $signalBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)

    $titleFont = New-Object System.Drawing.Font "Segoe UI Semibold", 40, ([System.Drawing.FontStyle]::Bold)
    $heroFont = New-Object System.Drawing.Font "Segoe UI", 24, ([System.Drawing.FontStyle]::Bold)
    $subtitleFont = New-Object System.Drawing.Font "Segoe UI", 20
    $smallFont = New-Object System.Drawing.Font "Segoe UI Semibold", 16
    $monoFont = New-Object System.Drawing.Font "Consolas", 16
    $sideTitleFont = New-Object System.Drawing.Font "Consolas", 16, ([System.Drawing.FontStyle]::Bold)
    $sideTextFont = New-Object System.Drawing.Font "Segoe UI", 16

    $graphics.DrawString($Badge, $smallFont, [System.Drawing.Brushes]::Black, (New-Object System.Drawing.RectangleF 110, 98, 230, 28))
    $graphics.DrawString("AI Coding Tools Cheat Sheet", $titleFont, $whiteBrush, (New-Object System.Drawing.RectangleF 92, 168, 770, 110))
    $graphics.DrawString($Title, $heroFont, $mutedBrush, (New-Object System.Drawing.RectangleF 92, 290, 760, 48))
    $graphics.DrawString($Subtitle, $subtitleFont, $mutedBrush, (New-Object System.Drawing.RectangleF 92, 348, 760, 96))

    $graphics.FillRoundedRectangle($codeBrush, (New-Object System.Drawing.RectangleF 92, 470, 500, 64), 16)
    $graphics.DrawString("agents + prompts + workflows + MCP", $monoFont, $softBrush, (New-Object System.Drawing.RectangleF 118, 490, 450, 30))

    $graphics.FillEllipse($signalBrush, 910, 126, 14, 14)
    $graphics.FillEllipse($signalBrush, 942, 126, 14, 14)
    $graphics.FillEllipse($signalBrush, 974, 126, 14, 14)

    $graphics.DrawString("why teams use it", $sideTitleFont, $chipBrush, (New-Object System.Drawing.RectangleF 874, 188, 250, 30))
    $graphics.DrawString("Practical guidance for tool choice, repo instructions, security controls, and rollout.", $sideTextFont, $mutedBrush, (New-Object System.Drawing.RectangleF 874, 228, 220, 116))
    $graphics.DrawString("github pages", $sideTitleFont, $chipBrush, (New-Object System.Drawing.RectangleF 874, 382, 250, 30))
    $graphics.DrawString("Static, searchable docs with stable links and shareable previews.", $sideTextFont, $mutedBrush, (New-Object System.Drawing.RectangleF 874, 422, 220, 96))

    $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

    $graphics.Dispose()
    $bitmap.Dispose()
    $brush.Dispose()
    $glowBrush.Dispose()
    $panelBrush.Dispose()
    $gridPen.Dispose()
    $chipBrush.Dispose()
    $mutedBrush.Dispose()
    $softBrush.Dispose()
    $codeBrush.Dispose()
    $signalBrush.Dispose()
    $titleFont.Dispose()
    $heroFont.Dispose()
    $subtitleFont.Dispose()
    $smallFont.Dispose()
    $monoFont.Dispose()
    $sideTitleFont.Dispose()
    $sideTextFont.Dispose()
}

$cards = @(
    @{ Name = "social-home.png"; Accent = "#3EE7B7"; Title = "Docs, commands, and adoption paths"; Subtitle = "Vendor-neutral guides for developers, teams, and engineering leaders."; Badge = "HOME / HANDBOOK" },
    @{ Name = "social-comparison.png"; Accent = "#60A5FA"; Title = "Compare AI coding tools clearly"; Subtitle = "Choose by workflow fit, security model, repo instructions, and team controls."; Badge = "COMPARE / DECIDE" },
    @{ Name = "social-agents.png"; Accent = "#F59E0B"; Title = "AGENTS.md and CLAUDE.md guidance"; Subtitle = "Repository instructions, templates, and best practices for coding agents."; Badge = "INSTRUCTIONS / RULES" },
    @{ Name = "social-mcp.png"; Accent = "#A78BFA"; Title = "MCP evaluation and least privilege"; Subtitle = "Understand protocol value, server categories, approval, and revocation boundaries."; Badge = "MCP / INTEGRATIONS" },
    @{ Name = "social-workflows.png"; Accent = "#F97316"; Title = "Review, test, fix, and upgrade"; Subtitle = "Safer AI-assisted engineering workflows with prompts, checkpoints, and validation."; Badge = "WORKFLOWS / DELIVERY" },
    @{ Name = "social-governance.png"; Accent = "#F43F5E"; Title = "Team rollout and security controls"; Subtitle = "Policies, evaluation templates, permissions, and adoption standards for organizations."; Badge = "GOVERNANCE / POLICY" },
    @{ Name = "social-repo-preview.png"; Accent = "#22C55E"; Title = "Open-source handbook for modern AI dev tools"; Subtitle = "Claude Code, OpenAI Codex, Cursor, Copilot, MCP workflows, prompts, and team standards."; Badge = "GITHUB / PREVIEW" }
)

foreach ($card in $cards) {
    $outputPath = Join-Path $root $card.Name
    New-SocialCard -Path $outputPath -Accent $card.Accent -Title $card.Title -Subtitle $card.Subtitle -Badge $card.Badge
    Write-Host "Generated $outputPath"
}
