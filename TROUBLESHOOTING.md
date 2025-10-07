# Etherith CLI - Troubleshooting Guide

Common issues and solutions for Etherith CLI installation and usage.

---

## 🔴 PowerShell: "Running scripts is disabled on this system"

### Problem
When you try to run `etherith` in PowerShell, you get this error:

```
etherith : File C:\Users\YourName\AppData\Roaming\npm\etherith.ps1 cannot be loaded because running scripts
is disabled on this system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

### Why This Happens
Windows PowerShell has a security feature called "Execution Policy" that prevents scripts from running by default. When npm installs global packages like Etherith, it creates both a `.cmd` file and a `.ps1` (PowerShell script) file. If your PowerShell execution policy is too restrictive, the PowerShell script won't run.

### ✅ Solution 1: Run the Fix Script (Easiest)

1. Open Command Prompt (CMD) or PowerShell **as Administrator**
2. Navigate to the Etherith installation directory
3. Run the fix script:
   ```cmd
   fix-powershell.bat
   ```

This will configure PowerShell to allow Etherith CLI to run.

### ✅ Solution 2: Use Command Prompt (CMD) Instead

The simplest workaround is to use **Command Prompt (CMD)** instead of PowerShell:

1. Press `Win + R`
2. Type: `cmd`
3. Press `Enter`
4. Run Etherith commands normally:
   ```cmd
   etherith --help
   etherith init "My Family Archive"
   ```

**Note:** CMD doesn't have execution policy restrictions, so Etherith will work immediately without any configuration.

### ✅ Solution 3: Manual PowerShell Fix

If you prefer to fix PowerShell manually:

1. Open **PowerShell as Administrator** (Right-click PowerShell → Run as Administrator)
2. Run this command:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Type `Y` and press Enter to confirm
4. Close and reopen PowerShell
5. Try running `etherith --help`

### What This Does
Setting the execution policy to `RemoteSigned` allows:
- ✅ Locally created scripts (like npm packages) to run
- ✅ Downloaded scripts to run if they're digitally signed
- ❌ Unsigned downloaded scripts from the internet (for security)

This is a safe configuration that balances security with functionality.

---

## 🔴 Node.js Not Found

### Problem
```
'node' is not recognized as an internal or external command
```

### Solution
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (recommended for most users)
3. Run the installer and follow the prompts
4. Restart your terminal/command prompt
5. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

---

## 🔴 npm Not Found

### Problem
```
'npm' is not recognized as an internal or external command
```

### Solution
npm is included with Node.js, so:
1. Reinstall Node.js from [nodejs.org](https://nodejs.org/)
2. Make sure to check "Add to PATH" during installation
3. Restart your terminal
4. Verify:
   ```cmd
   npm --version
   ```

---

## 🔴 Installation Fails with Permission Errors

### Problem
```
Error: EACCES: permission denied
```

### Solution (Windows)
1. Run Command Prompt or PowerShell **as Administrator**
2. Navigate to the Etherith directory
3. Run the installer again:
   ```cmd
   install.bat
   ```

### Solution (Linux/Mac)
Use `sudo` with npm:
```bash
sudo npm install -g
```

Or configure npm to install globally without sudo:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## 🔴 "etherith" Command Not Found After Installation

### Problem
After successful installation, running `etherith` shows:
```
'etherith' is not recognized as an internal or external command
```

### Solution 1: Restart Terminal
Close and reopen your terminal/command prompt, then try again.

### Solution 2: Check npm Global Path
1. Check where npm installs global packages:
   ```cmd
   npm config get prefix
   ```
2. Add this path to your system PATH environment variable
3. Restart terminal

### Solution 3: Reinstall
```cmd
npm uninstall -g etherith
npm install -g etherith
```

---

## 🔴 Build Fails During Installation

### Problem
```
Error: Build failed
```

### Solution
1. Clear npm cache:
   ```cmd
   npm cache clean --force
   ```
2. Delete `node_modules` folder:
   ```cmd
   rmdir /s /q node_modules
   ```
3. Reinstall:
   ```cmd
   npm install
   npm run build
   ```

---

## 🔴 IPFS Upload Fails

### Problem
Files won't upload to IPFS or you get timeout errors.

### Solution
1. Check your internet connection
2. Try uploading a smaller file first
3. Verify the file path is correct
4. Check if the file is accessible (not locked by another program)

---

## 🔴 Vault Initialization Fails

### Problem
```
Error: Could not initialize vault
```

### Solution
1. Make sure you're in a writable directory
2. Check disk space
3. Try with a different vault name (avoid special characters)
4. Run with elevated permissions if needed

---

## 📝 Getting More Help

If you're still experiencing issues:

1. **Check existing issues**: [GitHub Issues](https://github.com/your-org/etherith-cli/issues)
2. **Create a new issue**: Include:
   - Your operating system (Windows, Mac, Linux)
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Full error message
   - Steps to reproduce the problem

---

## 🛠️ Diagnostic Commands

Run these commands to gather information for troubleshooting:

```cmd
# Check Node.js version
node --version

# Check npm version
npm --version

# Check where npm is installed
where npm

# Check where Etherith is installed
where etherith

# Check npm global packages
npm list -g --depth=0

# Check npm configuration
npm config list

# Check PowerShell execution policy
powershell -Command "Get-ExecutionPolicy -List"
```

---

## 📚 Additional Resources

- [Node.js Official Documentation](https://nodejs.org/docs)
- [npm Troubleshooting Guide](https://docs.npmjs.com/troubleshooting)
- [PowerShell Execution Policies](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)
