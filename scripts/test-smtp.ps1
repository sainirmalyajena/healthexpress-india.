$smtpServer = "smtp.zoho.in"
$smtpPort = 587
$username = "healthexpressindia@healthexpressindia.com"
$password = "K1JTfs2SP5fU"
$to = "healthexpressindia@healthexpressindia.com"
$subject = "✅ SMTP VERIFIED - HealthExpress Restoration"
$body = "This is a direct SMTP test from the HealthExpress server environment. The credentials in .env.local are functional."

$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$creds = New-Object System.Management.Automation.PSCredential($username, $securePassword)

Send-MailMessage -From $username -To $to -Subject $subject -Body $body -SmtpServer $smtpServer -Port $smtpPort -Credential $creds -UseSsl
Write-Host "✅ Email Sent Successfully via PowerShell!"
